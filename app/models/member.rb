class Member < ActiveRecord::Base
  belongs_to :location
  has_many :friends

  serialize :times

  attr_accessible :first_name, :last_name, :times, :email, :phone, :leader


  validates :first_name, :last_name, :times, :email, :presence => true

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


end
