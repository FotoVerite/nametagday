class AddTimeCountsToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :time_counts, :string
  end
end
