class RegistrationsController < ApplicationController

  def new
    @member = Member.new(:times => [])
  end

  def create
    @member = Member.new
    @member.times = []
    @member.attributes = params[:member]
    @friends = params[:friends][:emails].map do |email|
      Friend.new(:email => email) unless email.blank?
    end.compact unless params[:friends][:emails] == ['']
    if @member.save
      session[:member_id] = @member.id
      flash[:notice] = "You've signed up"
      @member.delay.add_to_mailing_list
      @friends.each do |friend|
        friend.member_id = @member.id
        friend.save
      end
      redirect_to confirmation_registration_path
    else
      render('new')
    end
  end

  def confirmation
    render_404 unless session[:member_id]
    @member = Member.find(session[:member_id])
    @friends = @member.friends
  end

end
