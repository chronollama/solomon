# == Schema Information
#
# Table name: debts
#
#  id          :integer          not null, primary key
#  amount      :integer          not null
#  debtor_id   :integer          not null
#  creditor_id :integer          not null
#  bill_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Debt < ActiveRecord::Base
  validates :amount, :debtor, :creditor, presence: true
  validates :amount, numericality: { greater_than_or_equal_to: 0 }
  validates :bill_id, uniqueness: { scope: [:debtor_id, :creditor_id] }

  belongs_to :bill

  belongs_to :debtor,
    class_name: :User,
    primary_key: :id,
    foreign_key: :debtor_id

  belongs_to :creditor,
    class_name: :User,
    primary_key: :id,
    foreign_key: :creditor_id

  def self.net(user1_id, user2_id)
    
  end
end
