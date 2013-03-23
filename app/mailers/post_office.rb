class PostOffice < ActionMailer::Base
  add_template_helper(ApplicationHelper)


  default :from => "hello@nametagday.com"


  def invited_by_a_friend_email(friend)
    @member = friend.member
    @friend = friend
    @url = friend_registration_url(:token => friend.registration_token)
    mail(
      :to => @member.email,
      :subject => "#{BRAND} - #{@member.full_name} wants you to join them in #{BRAND}"
    )
  end

end