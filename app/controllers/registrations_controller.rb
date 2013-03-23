class RegistrationsController < ApplicationController

  def new
    @member = Member.new(:times => [])
  end

  def create
    @member = Member.new
    @member.times = []
    @member.attributes = params[:member]
    digest_friends(params[:friends])
    @leader = Friend.find_by_registration_token(params[:registration_token]).member  if params[:registration_token].present?
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
      if @leader
        render('friend_registration')
      else
        render('new')
      end
    end
  end

  def confirmation
    return render_404 unless @member = Member.find_by_id(session[:member_id])
    @friends = @member.friends
  end

  def friend_registration
    return render_404 unless friend = Friend.find_by_registration_token(params[:token])
    @member = Member.new(:times => [], :email => friend.email)
    @leader = friend.member
  end

 private

  def digest_friends(friends)
    return nil if (!friends || friends[:emails].uniq == [''])
    @friends = params[:friends][:emails].map { |email|
      Friend.new(:email => email) unless email.blank?
    }.compact
  end

end
