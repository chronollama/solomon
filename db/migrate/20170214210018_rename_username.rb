class RenameUsername < ActiveRecord::Migration[5.0]
  def change
    remove_index :users, :username
    rename_column :users, :username, :name
    add_index :users, :email, unique: true
  end
end
