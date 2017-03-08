# == Schema Information
#
# Table name: friendships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Friendship < ActiveRecord::Base
  validates :friender, presence: true
  validates :friendee, presence: true

  validates :user_id, uniqueness: { scope: :friend_id,
    message: "You are already friends with that person." }
  validates :friend_id, uniqueness: { scope: :user_id,
    message: "You are already friends with that person." }
  validate :cannot_friend_self
  validate :friendship_already_exists

  belongs_to :friender,
    class_name: :User,
    primary_key: :id,
    foreign_key: :user_id

  belongs_to :friendee,
    class_name: :User,
    primary_key: :id,
    foreign_key: :friend_id

  def self.exists?(user_id, friend_id)
    !!self.find_by_users(user_id, friend_id)
  end

  def self.find_by_users(user_id, friend_id)
    Friendship.where("user_id = #{user_id} AND friend_id = #{friend_id}
      OR user_id = #{friend_id} AND friend_id = #{user_id}").first
  end

  def self.debt_between(current_user_id, friend_id)
    Debt.net(current_user_id, friend_id)
  end

  private

  def cannot_friend_self
    if user_id == friend_id
      errors.add(:friendship, "Cannot friend self")
    end
  end

  def friendship_already_exists
    if Friendship.find_by(user_id: friend_id, friend_id: user_id)
      errors.add(:friendship, "You are already friends with that person")
    end
  end
end
