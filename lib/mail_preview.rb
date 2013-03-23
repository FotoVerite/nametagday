class MailPreview < MailView

  def invited_by_a_friend_email
    member = FactoryGirl.build(:member)
    friend = FactoryGirl.build(:friend)
    friend.registration_token = "token"
    friend.member = member
    PostOffice.invited_by_a_friend_email(friend)
  end

end
