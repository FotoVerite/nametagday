require 'json'


class Location < ActiveRecord::Base

  has_many :members

  serialize :time_counts

  TIMES = {
    1 => "11am - 1pm",
    2 => "1 - 3pm",
    3 => "3 - 5pm",
    4 => "9:30am - 1:30pm (as a coordinator)",
    5 => "1:30pm - 5:30pm (as a coordinator)",
  }

end
