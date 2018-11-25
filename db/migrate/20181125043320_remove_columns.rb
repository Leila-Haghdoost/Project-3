class RemoveColumns < ActiveRecord::Migration[5.2]
  def self.up
    remove_column :movies, :collection_id
  end

  def self.down
    add_column :movies, :collection_id, :t.integer
  end
end
