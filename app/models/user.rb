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

  has_many :bill_shares, inverse_of: :user, dependent: :destroy

  has_many :bills,
    through: :bill_shares,
    source: :bill

  has_many :debts,
    class_name: :Debt,
    primary_key: :id,
    foreign_key: :debtor_id

  has_many :credits,
    class_name: :Debt,
    primary_key: :id,
    foreign_key: :creditor_id

  def add_friend(friend_id)
    Friendship.create!(user_id: id, friend_id: friend_id)
  end

  def friends
    requested_friends + received_friends
  end

  def grouped_credits
    credits.group(:debtor_id).sum(:amount)
  end

  def grouped_debts
    debts.group(:creditor_id).sum(:amount)
  end

  def net_balances
    balances = {}
    grouped_credits.each do |id, sum|
      balances[id] = { status: "creditor", amount: sum }
    end

    grouped_debts.each do |id, sum|
      if balances[id]
        net = balances[id][:amount] - sum
        if net > 0
          balances[id][:amount] = net
        elsif net < 0
          balances[id][:status] = "debtor"
          balances[id][:amount] = net * -1
        else
          balances[id][:status] = "settled"
          balances[id][:amount] = 0
        end
      else
        balances[id] = {status: "debtor", amount: sum }
      end
    end

    balances
  end

  def search_friends(query)
    first_match = requested_friends.where("users.name LIKE '%#{query}%' OR users.email LIKE '%#{query}%'")
    second_match = received_friends.where("users.name LIKE '%#{query}%' OR users.email LIKE '%#{query}%'")
    first_match + second_match
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
