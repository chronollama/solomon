class RenameFriendsTable < ActiveRecord::Migration[5.0]
  def change
    add_index :friends, [:friend_id, :user_id], unique: true

    rename_table :friends, :friendships
  end
end
