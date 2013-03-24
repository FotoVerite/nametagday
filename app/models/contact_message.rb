# ContactMessage is not an ActiveRecord class
# It is used to make it easy to validate the input
# of form data when a user wants to send general
# site messages.
class ContactMessage

  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :first_name, :last_name, :email, :message

  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :message

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