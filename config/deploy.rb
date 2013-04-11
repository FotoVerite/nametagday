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

# Only recompile assets which have changed
# http://www.bencurtis.com/2011/12/skipping-asset-compilation-with-capistrano/
# This does not override cap recipe, instead use this code to patch:
#   /gems/capistrano-2.9.0/lib/capistrano/recipes/deploy/assets.rb
# Only recompile assets which have changed
# http://www.bencurtis.com/2011/12/skipping-asset-compilation-with-capistrano/
# This does not override cap recipe, instead use this code to patch:
#   /gems/capistrano-2.9.0/lib/capistrano/recipes/deploy/assets.rb
set :assets_dependencies, %w(app/assets Gemfile.lock config/routes.rb)
namespace :deploy do
  namespace :assets do
    desc <<-DESC
      Run the asset precompilation rake task. You can specify the full path \
      to the rake executable by setting the rake variable. You can also \
      specify additional environment variables to pass to rake via the \
      asset_env variable. The defaults are:

      set :rake,      "rake"
      set :rails_env, "production"
      set :asset_env, "RAILS_GROUPS=assets"
      set :assets_dependencies, %w(app/assets lib/assets vendor/assets Gemfile.lock config/routes.rb)

      Add to asset_dependencies like this:
      set :assets_dependencies, fetch(:assets_dependencies) + %w(lib/assets)
    DESC
    task :precompile, :roles => :web, :except => { :no_release => true } do
      from = source.next_revision(current_revision)
      if capture("cd #{latest_release} && #{source.local.log(from)} #{assets_dependencies.join(' ')} | wc -l").to_i > 0
        run %Q{cd #{latest_release} && #{rake} RAILS_ENV=#{rails_env} #{asset_env} assets:precompile}
      else
        logger.info "Skipping asset pre-compilation because there were no asset changes"
      end
    end
  end
end