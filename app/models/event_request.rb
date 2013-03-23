# ContactMessage is not an ActiveRecord class
# It is used to make it easy to validate the input
# of form data when a user wants to send general
# site messages.
class EventRequest

  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :first_name, :last_name, :email, :phone, :amount, :event_name, :location, :organization, :description, :notes

  AMOUNT = [25, 50, 100, 200, 300, "other"]

  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :phone
  validates_presence_of :amount
  validates_presence_of :event_name
  validates_presence_of :location
  validates_presence_of :organization
  validates_presence_of :description

  validates :email, :format => {:with => STANDARD_EMAIL_REGEX, :message => "Email is an invalid address"}

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def persisted?
    false
  end

end