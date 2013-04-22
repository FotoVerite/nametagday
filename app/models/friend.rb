# == Schema Information
#
# Table name: friends
#
#  id                 :integer          not null, primary key
#  member_id          :integer
#  email              :string(255)
#  registration_token :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Friend < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :email, :member_id

  validates :email, :member_id, :presence => true

  belongs_to :member

  before_create :create_registration_token
  after_create :send_invite

  def self.create_token(string="")
    Digest::SHA1.hexdigest("Use the #{string} with #{Time.now}")
  end

  private

  def create_registration_token
    self.registration_token = Friend.create_token(member.full_name)
  end

  def send_invite
    PostOffice.delay.invited_by_a_friend_email(self)
  end

end
