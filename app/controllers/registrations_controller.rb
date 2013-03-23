class RegistrationsController < ApplicationController

  def new
    @member = Member.new
  end

  def create
    @member = Member.new(params[:member])
    if @member.save
      flash[:notice] = "You've signed up"
      gb = Gibbon.new(MAILCHIMP_API_KEY)
      gb.list_subscribe({
        :id => Rails.env == 'production' ? 'fill' : '7823cd6593',
         :email_address => @member.email,
         :merge_vars => {
          :FNAME => @member.first_name,
          :LNAME => @member.first_name
        }
      })
      redirect_to confirmation_registration_path
    else
      render('new')
    end
  end

end
