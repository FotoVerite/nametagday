# == Schema Information
#
# Table name: friends
#
#  id                 :integer          not null, primary key
#  member_id          :integer
#  email              :string(255)
#  registration_token :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

require 'spec_helper'

describe Friend do
  pending "add some examples to (or delete) #{__FILE__}"
end
