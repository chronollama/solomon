class AddUniqueIndexToUsers < ActiveRecord::Migration[5.0]
  def change
    remove_index :users, :session_token
    add_index :users, :session_token, unique: true
    add_index :users, :username, unique: true
  end
end
