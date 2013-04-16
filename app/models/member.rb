class Member < ActiveRecord::Base
  belongs_to :location
  has_many :friends

  serialize :times

  attr_accessible :first_name, :last_name, :times, :email, :phone, :leader, :times, :canceled, :reservation_token

  validates :first_name, :last_name, :times, :email, :presence => true

  scope :search, lambda {|search| where(
      ['first_name LIKE :kw OR last_name LIKE :kw OR email LIKE :kw', :kw => "%#{search}%"]
  ) unless search.nil? }

  before_create :create_registration_token
  after_create {|member|  member.update_location_time_counts 1}

  def canceled?
    canceled == "1"
  end

  def mark_canceled
    update_attribute(:canceled, true)
    update_location_time_counts(-1)
  end

  def reactivate
    if canceled
      update_attribute(:canceled, false)
      update_location_time_counts(1)
    end
  end

  def update_location_time_counts(amount)
    self.times.each do |t|
      Location.transaction do
        loc = Location.lock(true).find(self.location_id)
        loc.time_counts[t] += amount
        loc.save!
      end
    end
  end


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
          :LNAME => last_name
        }
      })
  end

  def times_as_string
    array = []
    for time in times
      array << Location::TIMES[time]
    end
    array.to_sentence
  end

  def friends_emails
    friends.pluck(:email).join(", ")
  end

  def self.create_token(string="")
    Digest::SHA1.hexdigest("Use the #{string} with #{Time.now} #{rand}")
  end

  private

  def create_registration_token
    self.reservation_token = Member.create_token(full_name)
  end

end
