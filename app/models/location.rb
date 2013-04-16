require 'json'


class Location < ActiveRecord::Base

  has_many :members

  serialize :time_counts

  before_create :institate_times_hash

  TIMES = {
    1 => "11am - 1pm",
    2 => "1 - 3pm",
    3 => "3 - 5pm",
    4 => "9am - 1pm (as a coordinator)",
    5 => "1pm - 5pm (as a coordinator)",
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
