class Friend < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :email, :member_id

  validates :email, :member_id, :presence => true
end
