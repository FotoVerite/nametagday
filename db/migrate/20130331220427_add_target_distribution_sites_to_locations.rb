class AddTargetDistributionSitesToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :target_distribution_sites, :int
  end
end
