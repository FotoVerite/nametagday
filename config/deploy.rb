require 'capistrano/ext/multistage'
require 'bundler/capistrano'
require 'capistrano/novafabrica/base'
#require 'capistrano/novafabrica/dj'
require 'capistrano/novafabrica/unicorn'

default_run_options[:pty] = true
ssh_options[:forward_agent] = true

set :stages, %w(staging production)
set :default_stage, "production"
set :application, "NameTagDay"
set :short_name, "NameTagDay"
set :rails_root, "#{File.dirname(__FILE__)}/../"

set :scm, "git"
set :repository,  "https://github.com/FotoVerite/nametagday.git"
set :scm_user, "matt@novafabrica.com"
set :repository_cache, "git_cache"
set :deploy_via, :remote_cache
set :use_sudo, false
