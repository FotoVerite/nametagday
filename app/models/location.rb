require 'json'


class Location < ActiveRecord::Base

  has_many :members

  serialize :time_counts

  TIMES = {
    1 => "11-1",
    2 => "1-3",
    3 => "3-5",
    4 => "coordinator:9-1",
    5 => "coordinator:1-5",
  }

end
