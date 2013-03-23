class Member < ActiveRecord::Base
  belongs_to :location

  serialize :times

end
