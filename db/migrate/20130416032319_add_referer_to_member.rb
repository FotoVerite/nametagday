class AddRefererToMember < ActiveRecord::Migration
  def change
    add_column :members, :referer_id, :integer
    add_index :members, :referer_id
  end
end
