# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :member do
    first_name Faker::Name.first_name
    last_name Faker::Name.first_name
    times [1]
    email Faker::Internet.email
  end
end
