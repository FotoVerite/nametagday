require 'factory_girl'
require 'ffaker'
require 'fileutils'
require 'open-uri'


def random(array, number=1)
  array.shuffle[0..(number - 1)].first
end

def rand_in_range(from, to)
  rand * (to - from) + from
end

def rand_time(from, to)
  Time.at(rand_in_range(from.to_f, to.to_f))
end

members = []
locations = []
friends = []

ActiveRecord::Base.connection.execute("TRUNCATE admins")
FactoryGirl.create(:admin, :first_name => 'Matt', :last_name => 'Bergman', :email => "matt@novafabrica.com", :password => "password", :password_confirmation => "password", :enabled => true)

ActiveRecord::Base.connection.execute("TRUNCATE locations")
empty_times = {}
Location::TIMES.keys.each {|t| empty_times[t] = 0}
locations << FactoryGirl.create(:location,
								:name => "Union Square",
								:lat => 40.7361,
								:lng => -73.9901,
								:time_counts => empty_times)
locations << FactoryGirl.create(:location,
								:name => "Washington Square Park",
								:lat => 40.7308,
								:lng => -73.9975,
								:time_counts => empty_times)
locations << FactoryGirl.create(:location,
								:name => "Times Square",
								:lat => 40.7566,
								:lng => -73.9863,
								:time_counts => empty_times)

ActiveRecord::Base.connection.execute("TRUNCATE members")
1000.times do
  members << FactoryGirl.create(:member, :location => random(locations), :times => [1])
end

ActiveRecord::Base.connection.execute("TRUNCATE friends")
members.each do |member|
  random([0,1,2,3]).times do
   friends << FactoryGirl.create(:friend, :member => member)
 end
end