class Member < ActiveRecord::Base
  belongs_to :location

  serialize :times

  attr_accessible :first_name, :last_name, :times, :email, :phone, :leader


  validates :first_name, :last_name, :times, :email, :phone, :presence => true

end
