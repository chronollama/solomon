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

  def self.net(current_user_id, user2_id)
    current_user_owes = Debt.where("debtor_id = #{current_user_id} AND creditor_id = #{user2_id}").sum(:amount)
    user2_owes = Debt.where("debtor_id = #{user2_id} AND creditor_id = #{current_user_id}").sum(:amount)
    net = current_user_owes - user2_owes
    if net > 0
      {status: :debtor, amount: net}
    elsif net < 0
      {status: :creditor, amount: net * -1}
    else
      {status: :settled, amount: 0}
    end
  end
end
