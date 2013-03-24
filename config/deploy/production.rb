set :branch, "master"
set :deploy_to, "/var/www/nametagday_production"
set :user, "deploy"
set :rails_env, 'production'

role :app, "69.164.214.193"
role :web, "69.164.214.193"
role :db,  "69.164.214.193", :primary => true


# This should be run as the last task
after "delayed_job:restart", "application:ping"

namespace :application do

  desc 'Start up app'
  task :ping, :role => :web do
    run "curl 69.164.214.193 -u client:creative#bug >/dev/null 2>&1"
  end

end