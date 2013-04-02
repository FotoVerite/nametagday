require 'json'


class Location < ActiveRecord::Base

  has_many :members

  serialize :time_counts

  TIMES = {
    1 => "9-11",
    2 => "11-1",
    3 => "1-3",
    4 => "3-5",
    5 => "coordinator:9-1",
    6 => "coordinator:1-5",
  }

end
