# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, :name, presence: true
  validates :password, length: { minimum: 6, allow_nil: true,
    message: "Password must have a minimum length of 6 characters"}
  before_validation :ensure_session_token

  attr_reader :password

  has_many :requested_friendships,
    class_name: :Friendship,
    primary_key: :id,
    foreign_key: :user_id

  has_many :received_friendships,
    class_name: :Friendship,
    primary_key: :id,
    foreign_key: :friend_id

  has_many :requested_friends,
    through: :requested_friendships,
    source: :friendee

  has_many :received_friends,
    through: :received_friendships,
    source: :friender

  def friends
    requested_friends + received_friends
  end

  def add_friend(friend_id)
    Friendship.create!(user_id: id, friend_id: friend_id)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
