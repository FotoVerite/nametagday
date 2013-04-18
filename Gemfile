source 'http://rubygems.org'
gem 'rails', '3.2.12'
gem 'bcrypt-ruby'
gem 'rake'
gem 'jquery-rails'
gem 'dynamic_form'
gem 'mysql2'
gem 'delayed_job'
gem 'delayed_job_active_record'
gem 'nice_password'
gem "will_paginate", "~> 3.0.0"
gem 'paperclip', '~> 3.3.1'
gem "exception_notification", :git => "git://github.com/rails/exception_notification", :require => 'exception_notifier'
gem 'sass-rails'
gem 'uglifier'
gem 'friendly_id', '~>4.0.9'
gem 'twitter-bootstrap-rails', :git => 'git://github.com/seyhunak/twitter-bootstrap-rails.git', :branch => 'static'
gem 'unicorn'
gem 'gibbon'
gem 'clear_eyes'
#BECAUSE SEED
gem 'factory_girl_rails'
gem 'ffaker'
gem 'daemons'
gem 'mailjet'

group :development do
  gem 'annotate'
end

group :development, :test do
  gem 'thin'
  gem "steak"
  gem 'capistrano'
  gem 'capistrano-ext'
  #gem 'pry-rails'
  gem 'factory_girl_rails'
  gem 'ffaker'
  gem "mail_view", "~> 1.0.3"
end

group :test do
  # Pretty printed test output
  gem 'turn', :require => false
  gem 'simplecov', '>= 0.3.8', :require => false # Will install simplecov-html as a dependency
  gem 'capybara'
  gem 'database_cleaner'
  gem 'spork'
  gem 'launchy'    # So you can do Then show me the page
  gem 'email_spec'
  gem 'shoulda-matchers'
  gem 'minitest'
  gem "timecop"
end