
class RegistrationsController < ApplicationController

  def new
    @member = Member.new(:times => [])
    set_locations
  end

  def create
    @member = Member.new
    @member.times = []
    @member.location_id = params[:location_id]
    @member.attributes = params[:member]
    @member.times = params[:times].split(',').collect{|val| val.strip.to_i}.select{|val| Location::TIMES.has_key? val }
    digest_friends(params[:friends])
    @leader = Friend.find_by_registration_token(params[:registration_token]).member if params[:registration_token].present?
    @member.referer = @leader
    if @member.save
      session[:member_id] = @member.id
      flash[:notice] = "You've signed up"
      @member.delay.add_to_mailing_list
      PostOffice.delay.signed_up(@member)
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
    @leader = friend.member
    @member = Member.new(:times => [], :email => friend.email)
    @member.location = @leader.location
  end

  def get_reservation_link
    #Text Only
  end

  def resend_reservation_token
    @member = Member.find_by_email(params[:email])

    if @member
      PostOffice.delay.signed_up(@member)
      flash.now[:notice] = "All set!"
      render(:reservation_link_sent)
    else
      flash.now[:error] = "We couldn't find that email address. If you haven't signed up yet, <a href='/registration/new'>register here</a>."
      @show_signup_link = true
      render(:get_reservation_link)
    end

  end

  def edit
    return render_404 unless @member = Member.find_by_reservation_token(params[:token])
    session[:member_id] = @member.id
  end

  def update
    return render_404 unless @member = Member.find_by_reservation_token(params[:token])
    @member.attributes = (params[:member])
    @member.location_id = params[:location_id]
    @member.times = params[:times].split(',').collect{|val| val.strip.to_i}.select{|val| Location::TIMES.has_key? val }
    digest_friends(params[:friends])
    if @member.save
      flash[:notice] = "Your registration has been updated. See you on June 1!"
      unless @friends.nil?
        @friends.each do |friend|
          friend.member_id = @member.id
          friend.save
        end
      end
      redirect_to reservation_updated_registration_path
    else
      render('edit')
    end
  end

  def cancel_reservation
    return render_404 unless @member = Member.find_by_reservation_token(params[:token])
    @member.mark_canceled
    session[:member_id] = @member.id
    redirect_to :back
  end

  def reactivate_reservation
    return render_404 unless @member = Member.find_by_reservation_token(params[:token])
    @member.reactivate
    session[:member_id] = @member.id
    redirect_to :back
  end

  def reservation_updated
    return render_404 unless @member = Member.find_by_id(session[:member_id])
  end

  def reservation_canceled
    return render_404 unless @member = Member.find_by_id(session[:member_id])
  end

  def locations
    locations = Location.find(:all)
    respond_to do |format|
      format.json { render json: {"locations" => locations, "times" => Location::TIMES}}
    end
  end

 private

  def digest_friends(friends)
    return nil if (!friends || friends[:emails].uniq == [''])
    @friends = params[:friends][:emails].map { |email|
      Friend.new(:email => email) unless email.blank?
    }.compact
  end

  def set_locations
    @locations = {"locations" => Location.find(:all), "times" => Location::TIMES}.to_json
  end

end
