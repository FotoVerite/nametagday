class Staff::AccessController < StaffController

  skip_before_filter :confirm_staff_login, :except => [:menu, :destroy]

  def menu
    # just text
  end

  def new
    @hide_navigation = true
    # display login form
  end

  def create
    logout_keeping_session!('admin')
    found_user = Admin.authenticate(params['email'], params['password'])
    if found_user && found_user.enabled?
      self.current_user = found_user
      handle_remember_cookie!(params[:remember_me] == "1", "member")
      flash[:notice] = "You are now logged in."
      redirect_to desired_url(staff_root_path, {:key => :staff_desired_url})
    elsif found_user && !found_user.enabled?
      @hide_navigation = true
      flash[:error] = "Your account has been disabled."
      render('new')
    else
      @hide_navigation = true
      flash[:error]= "Username/password combination not found. Please try again."
      render('new')
    end
  end

  def destroy
    logout_keeping_session!('admin')
    flash[:notice] = "You are now logged out."
    redirect_to(staff_login_path)
  end

  def forgot_password
    @hide_navigation = true
    # display form
  end

  def send_new_password
    @admin = Admin.where(:email => params[:email], :enabled => true).first
    if @admin
      new_password = get_nice_password
      @admin.update_attribute(:password, new_password)
      @admin.email_new_password(new_password)
      flash[:notice] = "New password sent to account's designated email"
      redirect_to staff_login_path
    else
      @hide_navigation = true
      flash[:notice] = "Username not found"
      render("forgot_password")
    end
  end

  def get_password_idea
    render(:text => get_nice_password)
  end

end
