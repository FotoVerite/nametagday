set :branch, "master"
set :deploy_to, "/var/www/nametagday_production"
set :user, "deploy"
set :rails_env, 'production'

role :app, "69.164.214.193"
role :web, "69.164.214.193"
role :db,  "69.164.214.193", :primary => true


# This should be run as the last task
after "deploy:update_code", "deploy:create_symlinks"
after "delayed_job:restart", "application:ping"
after "deploy:restart", "unicorn:restart"

namespace :application do

  desc 'Start up app'
  task :ping, :role => :web do
    run "curl 69.164.214.193 -u client:creative#bug >/dev/null 2>&1"
  end

end

set :unicorn_ctrl, "/etc/init.d/unicorn"

  namespace :unicorn do

    desc "start unicorn"
    task :start do
      run "#{unicorn_ctrl} start"
    end

    desc "stop unicorn"
    task :stop do
      run "#{unicorn_ctrl} stop"
    end

    desc "restart unicorn"
    task :restart do
      run "#{unicorn_ctrl} restart"
    end

    desc "tail :current_path/log/unicorn.stderr.log"
    task :tail do
      stream "tail -f #{current_path}/log/unicorn.stderr.log"
    end

end

set :symlinks, {}

# Deploy tasks for Passenger
namespace :deploy do

  desc "Create symlinks from the latest release to the shared directory"
  task :create_symlinks do

    run "ln -nfs #{shared_path}/config/database.yml #{latest_release}/config/database.yml"

    symlinks.each do |type, value|
      directories = value.is_a?(Array) ? value : [value]
      directories.each do |dir|
        run "mkdir -p  #{shared_path}/public/#{type}/#{dir}"
        run "rm -rf #{latest_release}/public/#{type}/#{dir}"
        run "ln -nfs #{shared_path}/public/#{type}/#{dir} #{latest_release}/public/#{type}/#{dir}"
      end
    end

  end

end