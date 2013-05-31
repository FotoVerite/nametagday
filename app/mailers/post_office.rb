class PostOffice < ActionMailer::Base
  add_template_helper(ApplicationHelper)


  default :from => "hello@nametagday.com"

  def signed_up(member)
    @member = member
    mail(
      :to => @member.email,
      :subject => "#{BRAND} - Thanks for signing up!"
    )
  end


  def invited_by_a_friend_email(friend)
    @member = friend.member
    @friend = friend
    @url = friend_registration_url(:token => friend.registration_token)
    mail(
      :to => @friend.email,
      :subject => "#{BRAND} - #{@member.full_name} wants you to join them in #{BRAND}"
    )
  end

  def contact_message(message)
    mail(
      :content_type => "text/plain",
      :to => "hello@nametagday.com",
      :reply_to => %(#{message.full_name} <#{message.email}>),
      :subject => "Contact Us Message",
      :body => message.message
    )
  end

  def event_request(event_request)
    @event_request = event_request
    mail(
      :content_type => "text/plain",
      :to => "hello@nametagday.com",
      :reply_to => %(#{event_request.full_name} <#{event_request.email}>),
      :subject => "Event Request"
    )
  end

  def assignment(member)
    @member = member
     mail(
      :to => member.email,
      :subject => "#{BRAND} - #{@member.full_name} assignment"
    )
   end
end