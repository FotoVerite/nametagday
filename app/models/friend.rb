class Friend < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :email, :member_id

  validates :email, :member_id, :presence => true

  belongs_to :member

  before_save :create_registration_token

  def self.create_token(string="")
    Digest::SHA1.hexdigest("Use the #{string} with #{Time.now}")
  end

  private

  def create_registration_token
    self.registration_token = Friend.create_token(member.full_name)
  end

end
