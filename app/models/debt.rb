# == Schema Information
#
# Table name: debts
#
#  id          :integer          not null, primary key
#  amount      :decimal(10, 2)   not null
#  debtor_id   :integer          not null
#  creditor_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Debt < ActiveRecord::Base
  validates :amount, :debtor, :creditor, presence: true
  validates_format_of :amount, with: /^\d+\.*\d{0,2}$/

  belongs_to :debtor,
    class_name: :User,
    primary_key: :id,
    foreign_key: :debtor_id

  belongs_to :creditor,
    class_name: :User,
    primary_key: :id,
    foreign_key: :creditor_id

  
end
