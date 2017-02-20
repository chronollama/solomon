# == Schema Information
#
# Table name: bill_shares
#
#  id         :integer          not null, primary key
#  due        :decimal(10, 2)   not null
#  paid       :decimal(10, 2)   not null
#  bill_id    :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BillShare < ActiveRecord::Base
  validates :due, :paid, :bill, :user, presence: true
  validates :due, :paid, numericality: { :greater_than_or_equal_to: 0 }
  validates_format_of :due, :paid, with: /^\d+\.*\d{0,2}$/

  belongs_to :bill
  belongs_to :user
end
