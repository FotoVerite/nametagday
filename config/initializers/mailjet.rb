# initializers/mailjet.rb
Mailjet.configure do |config|
  config.api_key = '16ede54ac6c29d717b69fa643384b55e'
  config.secret_key = 'your-secret-key'
  config.default_from = 'hello@nametagday.com'
end