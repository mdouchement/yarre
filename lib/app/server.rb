require 'json'
require 'slim'
require 'sinatra'
require 'compass'
require 'sinatra/config_file'
require "sinatra/json"
require 'sinatra/assetpack'
require 'zurb-foundation'

module App
  class Server < Sinatra::Base
    set :root, File.expand_path(File.join(Dir.pwd, 'lib'))

    register Sinatra::ConfigFile
    register Sinatra::AssetPack

    # Configuration
    config_file 'config/config.yml'

    Compass.configuration do |c|
      c.project_path = root
      c.sass_dir = 'assets/stylesheets'
      c.images_dir = 'assets/images'
      c.http_generated_images_path = '/img'
      c.add_import_path 'assets/stylesheets'
    end

    set :scss, Compass.sass_engine_options

    # Assets
    assets do
      serve '/js', from: 'assets/javascripts'
      serve '/css', from: 'assets/stylesheets'
      serve '/img', from: 'assets/images'

      # Javascript placed before the closing <head> tag
      js :head, [
        '/js/vendor/custom.modernizr.js',
        '/js/vendor/underscore.js', # required by Backbone
        '/js/vendor/jquery.js', # required by Backbone
        '/js/vendor/backbone.js',
        '/js/head.js'
      ]

      # Javascript placed before the closing <body> tag
      js :tail, [
        '/js/foundation/foundation.js',
        '/js/tail.js'
      ]

      css :app, [
        '/css/app.css'
      ]

      js_compression  :jsmin
      css_compression :sass
      prebuild false
    end

    get '/' do
      slim :index
    end

    post '/process' do
      status 200
      content_type :json

      json RegexProcessor.new(aparams[:pattern], aparams[:content], aparams[:modifiers]).process
    end

    private

    def aparams
      @aparams ||= params.merge(if request.env['CONTENT_TYPE'] == 'application/json'
                                  JSON.parse(request.body.read, symbolize_names: true) || {}
                                else
                                  {}
                                end)
    end
  end
end
