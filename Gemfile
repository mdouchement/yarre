source 'https://rubygems.org'

gem 'sinatra'
gem 'sinatra-contrib', require: %w(sinatra/config_file sinatra/json)
gem 'puma'
gem 'slim'
gem 'sinatra-assetpack'
gem 'zurb-foundation-5'
gem 'compass'

group :application do
  # Here should be all the specifics for the application
end

group :test do
  gem 'rspec'
end

group :development do
  gem 'rubocop'

  gem 'guard', '2.13.0'
  gem 'guard-livereload'
  gem 'guard-shotgun', github: 'rchampourlier/guard-shotgun'
end
