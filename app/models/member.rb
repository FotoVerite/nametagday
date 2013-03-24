class Member < ActiveRecord::Base
  belongs_to :location
  has_many :friends

  serialize :times

  attr_accessible :first_name, :last_name, :times, :email, :phone, :leader


  validates :first_name, :last_name, :times, :email, :presence => true

  scope :search, lambda {|search| where(
      ['first_name LIKE :kw OR last_name LIKE :kw OR email LIKE :kw', :kw => "%#{search}%"]
  ) unless search.nil? }

  before_create :create_registration_token

  def full_name
    "#{first_name} #{last_name}"
  end

  def add_to_mailing_list
    gb = Gibbon.new(MAILCHIMP_API_KEY)
      gb.list_subscribe({
        :id => Rails.env == 'production' ? 'fill' : '7823cd6593',
         :email_address => email,
         :merge_vars => {
          :FNAME => first_name,
          :LNAME => first_name
        }
      })
  end

  def times_as_string
    array = []
    for time in times
      array << Location::TIMES[time]
    end
    array.join(", ")
  end

  def friends_emails
    friends.pluck(:email).join(", ")
  end

  def self.create_token(string="")
    Digest::SHA1.hexdigest("Use the #{string} with #{Time.now}")
  end

  private

  def create_registration_token
    self.reservation_token = Member.create_token(full_name)
  end


end
