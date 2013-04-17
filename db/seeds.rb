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
FactoryGirl.create(:admin, :first_name => 'Tim', :last_name => 'O\'Donnell', :email => "timodonnell@gmail.com", :password => "password", :password_confirmation => "password", :enabled => true)


ActiveRecord::Base.connection.execute("TRUNCATE locations")
empty_times = {}
Location::TIMES.keys.each {|t| empty_times[t] = 0}

# Manhattan

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

# Brooklyn

locations << FactoryGirl.create(:location,
								:name => "Williamsburg",
								:lat => 40.721242,
								:lng => -73.952236,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Downtown Brooklyn",
								:lat => 40.689229,
								:lng => -73.994637,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Prospect Park",
								:lat => 40.662931,
								:lng => -73.970089,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Bushwick",
								:lat => 40.697039,
								:lng => -73.922195,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Sunset Park",
								:lat => 40.646262,
								:lng => -74.004936,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Bedford-Stuyvesant",
								:lat => 40.689229,
								:lng => -73.947258,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Ditmas Park",
								:lat => 40.639228,
								:lng => -73.964596,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Canarsie",
								:lat => 40.631151,
								:lng => -73.895416,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Bensonhurst",
								:lat => 40.612128,
								:lng => -74.018497,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Marine Park",
								:lat => 40.603005,
								:lng => -73.922710,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Sheepshead Bay",
								:lat => 40.597662,
								:lng => -73.954124,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Red Hook",
								:lat => 40.676277,
								:lng => -74.009056,
								:time_counts => empty_times,
								:target_distribution_sites => 8)

# Queens

locations << FactoryGirl.create(:location,
								:name => "Astoria",
								:lat => 40.772092,
								:lng => -73.930435,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Long Island City",
								:lat => 40.755645,
								:lng => -73.947687,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Sunnyside",
								:lat => 40.747257,
								:lng => -73.915501,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Corona Park",
								:lat => 40.745566,
								:lng => -73.844948,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Flushing",
								:lat => 40.766177,
								:lng => -73.830185,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Forest Hills",
								:lat => 40.714216,
								:lng => -73.848038,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Jamaica",
								:lat => 40.701594,
								:lng => -73.784523,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Bayside",
								:lat => 40.757010,
								:lng => -73.770962,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Far Rockaway",
								:lat => 40.598900,
								:lng => -73.766069,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Elmhurst",
								:lat => 40.736397,
								:lng => -73.878765,
								:time_counts => empty_times,
								:target_distribution_sites => 8)

# The Bronx

locations << FactoryGirl.create(:location,
								:name => "East Bronx",
								:lat => 40.848359,
								:lng => -73.852844,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "West Bronx",
								:lat => 40.849917,
								:lng => -73.901596,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "South Bronx",
								:lat => 40.811990,
								:lng => -73.911896,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "Mosholu Park",
								:lat => 40.896257,
								:lng => -73.887863,
								:time_counts => empty_times,
								:target_distribution_sites => 8)

# Staten Island

locations << FactoryGirl.create(:location,
								:name => "Ferry Terminal",
								:lat => 40.640856,
								:lng => -74.081755,
								:time_counts => empty_times,
								:target_distribution_sites => 8)
locations << FactoryGirl.create(:location,
								:name => "South Shore",
								:lat => 40.523456,
								:lng => -74.190331,
								:time_counts => empty_times,
								:target_distribution_sites => 8)

ActiveRecord::Base.connection.execute("TRUNCATE members")
1000.times do
  members << FactoryGirl.create(:member, :location => random(locations), :times => [random([1,2,3,4,5])])
end

ActiveRecord::Base.connection.execute("TRUNCATE friends")
members.each do |member|
  random([0,1,2,3]).times do
   friends << FactoryGirl.create(:friend, :member => member)
 end
end