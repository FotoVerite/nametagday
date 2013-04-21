# == Schema Information
#
# Table name: locations
#
#  id                        :integer          not null, primary key
#  name                      :string(255)
#  address                   :string(255)
#  suite                     :string(255)
#  city                      :string(255)
#  state                     :string(255)
#  zip                       :string(255)
#  country                   :string(255)
#  lat                       :decimal(15, 10)
#  lng                       :decimal(15, 10)
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  target_distribution_sites :integer
#  time_counts               :string(255)
#

require 'json'


class Location < ActiveRecord::Base

  has_many :members

  serialize :time_counts

  before_create :institate_times_hash

  TIMES = {
    1 => "11am - 1pm",
    2 => "1 - 3pm",
    3 => "3 - 5pm",
    4 => "9:30am - 1:30pm (as a coordinator)",
    5 => "1:30pm - 5:30pm (as a coordinator)",
  }
  IS_COORDINATOR_TIME = {
  	1 => false,
  	2 => false,
  	3 => false,
  	4 => true,
  	5 => true,
  }

  def institate_times_hash
    self.time_counts = TIMES.keys.inject({}) {|hash, e| hash[e.to_i] = 0; hash;}
  end



end
