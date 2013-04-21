# == Schema Information
#
# Table name: locations
#
#  id                        :integer          not null, primary key
#  name                      :string(255)
#  address                   :string(255)
#  suite                     :string(255)
#  city                      :string(255)
#  state                     :string(255)
#  zip                       :string(255)
#  country                   :string(255)
#  lat                       :decimal(15, 10)
#  lng                       :decimal(15, 10)
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  target_distribution_sites :integer
#  time_counts               :string(255)
#

require 'spec_helper'

describe Location do
  pending "add some examples to (or delete) #{__FILE__}"
end
