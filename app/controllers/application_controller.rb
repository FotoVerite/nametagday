class ApplicationController < ActionController::Base

  include SessionMethods

  protect_from_forgery
  before_filter :correct_accept_headers

  HTTP_AUTH_USERS = { 'nametagday' => 'nametagday' }

  NO_AUTH_ENVS = ['development', 'test', 'production']

  unless NO_AUTH_ENVS.include?(Rails.env)
    before_filter :http_authenticate
  end

  def http_authenticate
    authenticate_or_request_with_http_basic do |username, password|
      HTTP_AUTH_USERS.fetch(username, false) == password
    end
  end

  def correct_accept_headers
    # Used to fix acceptence header in ie and safari.
    # NB remember sort needs to modify so keep it sort!
    request.accepts.sort! { |x, y| y.to_s == "text/javascript" ? 1 : -1 } if request.xhr?
  end

  def order_using_params
    params[:order] ? "#{params[:order]} #{params[:dir]}" : nil
  end

  def render_404
    render :file => Rails.root.to_s + "/public/404.html", :status => 404, :layout => false and return
  end

  def render_500
    render :file => Rails.root.to_s + "/public/500.html", :status => 500, :layout => false and return
  end

  def get_nice_password
    return NicePassword.new(:length => 12, :words => 2, :digits => 2)
  end

  protected

  def login_member(member)
    self.current_user = member
  end

  def confirm_staff_login
    unless admin_logged_in?
      session[:staff_desired_url] = url_for(params)
      flash[:notice] = "Please log in."
      redirect_to(staff_login_path) and return false
    end
    return true
  end

  # TODO: this should probably use admin_logged_in? like confirm_staff_login does
  def confirm_not_logged_in
    if session[:admin_id]
      flash[:notice] = "You are already logged in"
      redirect_to staff_root_path
    end
    return true
  end

  def confirm_member_logged_in
    unless member_logged_in?
      session[:desired_url] = url_for(params)
      respond_to do |format|
        format.html {
          flash[:notice] = "Please log in."
          redirect_to(login_path) and return false
        }
        format.json {
          render(:json => {:result => "Please log in."}) and return false
        }
      end
    end
    return true
  end

  def confirm_member_not_logged_in
    unless !member_logged_in?
      flash[:notice] = "You are already logged in"
      redirect_to member_path(@current_member)
    end
    return true
  end

  # deprecated, use "redirect_to desired_url()" instead
  def redirect_to_desired_url(fallback_url=nil, options={})
    redirect_to desired_url(fallback_url, options)
  end

  def desired_url(fallback_url=nil, options={})
    fallback_url ||= {:action => 'index'}
    key = options[:key] || :desired_url
    if session[key]
      url = session[key]
      session[key] = nil
    else
      url = fallback_url
    end
    url
  end

end