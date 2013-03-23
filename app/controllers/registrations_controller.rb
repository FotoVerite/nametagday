class RegistrationsController < ApplicationController

  def new
    @member = Member.new
  end

  def create
    @member = Member.new(params[:member])
    if @member.save
      flash[:notice] = "You've signed up"
      redirect_to confirmation_registration_path
    else
      render('new')
    end
  end

end
