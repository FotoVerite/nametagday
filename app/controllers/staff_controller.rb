# StaffController inherits from ApplicationController
# It contains methods common to all staff area controllers.
#
# All staff area controllers should inherit from StaffController
# and NOT from Application Controller.
#
class StaffController < ApplicationController

  layout 'staff'

  before_filter :confirm_staff_login

  def remember_search_params(all_params={})
    search_params = all_params.except(:controller, :action, :id, :clear)
    if search_params.empty?
      last_search = session[:last_search] || {}
      params.merge!(last_search)
    else
      session[:last_search] = search_params
    end
  end

  def clear_stored_search_params
    session[:last_search] = nil
  end

end
