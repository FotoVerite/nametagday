class Location < ActiveRecord::Base

  has_many :members

  TIMES = {
    1 => "9-11",
    2 => "11-1",
    3 => "1-3",
    4 => "3-5"
  }

end
