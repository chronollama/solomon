# == Schema Information
#
# Table name: bills
#
#  id          :integer          not null, primary key
#  category    :string           default("uncategorized"), not null
#  description :string           not null
#  total       :integer          not null
#  date        :date             not null
#  notes       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Bill < ActiveRecord::Base
  validates :category, :description, :total, :date, presence: true
  validates :total, numericality: { greater_than_or_equal_to: 0 }
  before_create :format_total
  after_create :record_debts
  # after_update update bill shares and debts, update attributes in controller or just update?
  after_commit :report_success
  after_rollback :report_failure

  has_many :bill_shares, inverse_of: :bill,  dependent: :destroy

  has_many :users,
    through: :bill_shares,
    source: :user

  def record_bill(shares)
    num_users = shares.length
    split = []
    num_users.times { split << (total / num_users) }

    remainder = total % num_users
    until remainder == 0
      split.map! do |amount|
        break if remainder == 0
        remainder -= 1
        amount += 1
      end
    end

    Bill.transaction do
      self.save
      shares.each do |user_id, paid|
        BillShare.create!(
          due: convert_to_cents(split.first),
          paid: convert_to_cents(paid),
          bill_id: self.id,
          user_id: user_id
        )
        split.shift
      end
    end
  end

  def creditors
    @creditors ||= {}
  end

  def debtors
    @debtors ||= {}
  end

  def aggregate_differences
    bill_shares.each do |bill_share|
      net = bill_share.paid - bill_share.due
      if net < 0
        self.debtors[bill_share.user_id] = net * -1
      elsif net > 0
        self.creditors[bill_share.user_id] = net
      end
    end
  end

  def record_debts
    creditors.each do |creditor_id, credit|
      make_whole(creditor_id, credit)
    end
  end

  private
  def make_whole(creditor_id, credit)
    debtors.each do |debtor_id, debt|
      if credit > debt
        Debt.create!(amount: debt, creditor_id: creditor_id, debtor_id: debtor_id)
        creditors[creditor_id] = credit - debt
      else credit <= debt
        Debt.create!(amount: credit, creditor_id: creditor_id, debtor_id: debtor_id)
        debt == credit ? debtors.delete(debtor_id) : debtors[debtor_id] = debt - credit
        creditors.delete(creditor_id)
        return nil
      end
    end
  end

  def format_total
    self.total = convert_to_cents(total)
  end

  def convert_to_cents(amount)
    (amount.to_f * 100).to_i
  end

  def report_success
    true
  end

  def report_failure
    false
  end
end
