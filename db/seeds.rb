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
								:time_counts => empty_times,
								:target_distribution_sites => 10)
locations << FactoryGirl.create(:location,
								:name => "Washington Square Park",
								:lat => 40.7308,
								:lng => -73.9975,
								:time_counts => empty_times,
								:target_distribution_sites => 9)
locations << FactoryGirl.create(:location,
								:name => "Times Square",
								:lat => 40.7566,
								:lng => -73.9863,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Bryant Park",
								:lat => 40.753564,
								:lng => -73.982878,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Tompkins Square Park",
								:lat => 40.726576,
								:lng => -73.981848,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Morningside Heights",
								:lat => 40.806468,
								:lng => -73.958502,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Fort Tryon Park",
								:lat => 40.862836,
								:lng => -73.931465,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Upper West Side",
								:lat => 40.785676,
								:lng => -73.970604,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Great Lawn",
								:lat => 40.781256,
								:lng => -73.966527,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Columbus Circle Area",
								:lat => 40.768029,
								:lng => -73.981977,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Midtown East",
								:lat => 40.751386,
								:lng => -73.976011,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Lower Manhattan",
								:lat => 40.712947,
								:lng => -74.005923,
								:time_counts => empty_times,
								:target_distribution_sites => 8)

ActiveRecord::Base.connection.execute("TRUNCATE members")
1000.times do
  members << FactoryGirl.create(:member, :location => random(locations), :times => [random([1,2,3,4,5,6])])
end

ActiveRecord::Base.connection.execute("TRUNCATE friends")
members.each do |member|
  random([0,1,2,3]).times do
   friends << FactoryGirl.create(:friend, :member => member)
 end
end