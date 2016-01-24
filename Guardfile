# Reload the server on source changes
guard 'shotgun', :server => 'puma' do
  watch(%r{lib/app/.+\.rb})
  watch %r{lib/config/.*\.yml}
  watch 'config.ru'
end

# Reload the browser on file changes, requires chrome extension
guard 'livereload' do
  watch(%r{^lib/views/.+\.slim})
  watch(%r{^lib/.+\.rb})
  watch(%r{lib/public/.+\..+})
  watch(%r{lib/config/.+\.yml})
  # Rails Assets Pipeline #TODO configure this
  watch(%r{(lib/assets/\w+/(.+\.(scss|css|js|html))).*}) { |m| "/assets/#{m[3]}" }
end
