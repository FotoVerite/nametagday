# == Schema Information
#
# Table name: members
#
#  id                :integer          not null, primary key
#  first_name        :string(255)
#  last_name         :string(255)
#  email             :string(255)
#  login_token       :string(255)
#  accept_token      :string(255)
#  phone             :string(255)
#  leader            :boolean          default(FALSE)
#  times             :string(255)
#  location_id       :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  canceled          :string(255)      default("0")
#  reservation_token :string(255)
#  referer_id        :integer
#

require 'spec_helper'

describe Member do
  pending "add some examples to (or delete) #{__FILE__}"
end
