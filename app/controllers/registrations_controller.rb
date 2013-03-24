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
      unless @friends.nil?
      	@friends.each do |friend|
          friend.member_id = @member.id
          friend.save
        end
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

  def edit
    return render_404 unless @member = Member.find_by_reservation_token(params[:token])
    session[:member_id] = @member.id
  end

  def update
    return render_404 unless @member = Member.find_by_reservation_token(params[:token])
    if @member.update_attributes(params[:member])
      flash[:notice] = "Member was successfully updated."
      redirect_to reservation_updated_registration_path
    else
      render('edit')
    end
  end

  def cancel_reservation
    return render_404 unless @member = Member.find_by_reservation_token(params[:token])
    @member.update_attribute(:canceled, true)
    session[:member_id] = @member.id
    redirect_to reservation_canceled_registration_path
  end

  def reservation_updated
    return render_404 unless @member = Member.find_by_id(session[:member_id])
  end

  def reservation_canceled
    return render_404 unless @member = Member.find_by_id(session[:member_id])
  end

 private

  def digest_friends(friends)
    return nil if (!friends || friends[:emails].uniq == [''])
    @friends = params[:friends][:emails].map { |email|
      Friend.new(:email => email) unless email.blank?
    }.compact
  end

end
