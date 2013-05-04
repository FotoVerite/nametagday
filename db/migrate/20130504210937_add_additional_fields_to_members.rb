class AddAdditionalFieldsToMembers < ActiveRecord::Migration
  def change
    add_column :members, :location_assignment, :string
    add_column :members, :assigned_times, :string
    add_column :members, :distribution_center, :string
    add_column :members, :assigned, :boolean
    add_column :members, :assigned_leader, :boolean
    add_column :members, :early_shift, :boolean
  end
end
