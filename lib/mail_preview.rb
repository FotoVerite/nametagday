class MailPreview < MailView

  def signed_up
    location = FactoryGirl.build(:location)
    referer = FactoryGirl.build(:member)
    member = FactoryGirl.build(:member,
      :friends => [
          FactoryGirl.build(:friend),
          FactoryGirl.build(:friend)
        ],
      :location => location,
      :referer => referer
    )
    PostOffice.signed_up(member)
  end

  def invited_by_a_friend_email
    member = FactoryGirl.build(:member)
    friend = FactoryGirl.build(:friend)
    friend.registration_token = "token"
    friend.member = member
    PostOffice.invited_by_a_friend_email(friend)
  end

  def event_request
    event_request = EventRequest.new({
        :first_name => "matthew",
        :last_name => "bergman",
        :email => "matthew@gmail.com",
        :amount => 25,
        :phone => "201-658-5727",
        :organization => "NAMETAGDAY",
        :event_name => "EVENT!",
        :location => "Union Square",
        :description => "I like turtles",
        :notes => "also platypuses"
      }
      )
    PostOffice.event_request(event_request)
  end

end
