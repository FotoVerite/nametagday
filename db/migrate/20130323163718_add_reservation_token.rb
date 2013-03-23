class AddReservationToken < ActiveRecord::Migration
  def change
    add_column :members, :canceled, :string, :default => false
    add_column :members, :reservation_token, :string
    add_index :members, :reservation_token
  end
end
