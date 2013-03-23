class CreateFriends < ActiveRecord::Migration
  def change
    create_table :friends do |t|
      t.references :member
      t.string :email
      t.timestamps
    end
  end
end
