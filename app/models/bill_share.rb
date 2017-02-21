# == Schema Information
#
# Table name: bill_shares
#
#  id         :integer          not null, primary key
#  due        :integer          not null
#  paid       :integer          not null
#  bill_id    :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BillShare < ActiveRecord::Base
  validates :due, :paid, :bill, :user, presence: true
  validates :due, :paid, numericality: { greater_than_or_equal_to: 0 }
  validates :bill_id, uniqueness: { scope: :user_id }

  belongs_to :bill
  belongs_to :user

  
end
