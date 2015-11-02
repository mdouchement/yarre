source 'https://rubygems.org'

gem 'sinatra'
gem 'sinatra-contrib', require: %w(sinatra/config_file sinatra/json)
gem 'thin'
gem 'slim'
gem 'sinatra-assetpack'
gem 'zurb-foundation'
gem 'compass'
gem 'guard-shotgun', github: 'rchampourlier/guard-shotgun'

group :application do
  # Here should be all the specifics for the application
end

group :test do
  gem 'rspec'
  gem 'rubocop'
end

group :development do
  gem 'rake'
  gem 'guard', '2.2.3'
  gem 'guard-rspec'
  gem 'guard-rubocop'
  gem 'guard-livereload'
  gem 'blam'
end
