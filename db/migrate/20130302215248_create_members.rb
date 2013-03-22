class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :login_token
      t.string :phone
      t.boolean :leader, :default => false
      t.references :location
      t.timestamps
    end
    add_index :members, :email
    add_index :members, :login_token
    add_index :members, :location_id
  end
end
