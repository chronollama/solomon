# == Schema Information
#
# Table name: bills
#
#  id          :integer          not null, primary key
#  category    :string           default("General"), not null
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
  # TODO: validate that shares sum to bill total

  has_many :debts, dependent: :destroy
  has_many :bill_shares, dependent: :destroy
  has_many :users,
    through: :bill_shares,
    source: :user

  def make_records(shares, bill_params = nil)
    success = false
    Bill.transaction do
      bill_params ? self.update(bill_params) : self.save!
      split = calculate_split(shares.length)
      create_shares(shares, split)
      aggregate_differences
      reconcile_debts_to_credits
      success = true
    end
    success
  end

  def update_records(shares, bill_params)
    # TODO use association id setter (bill.user_ids += or -= to directly add or remove join table entries)
    # Then, update entries based on new number of shares
    bill_shares.destroy_all
    debts.destroy_all
    make_records(shares, bill_params)
  end

  def self.convert_to_cents(amount)
    (amount.to_f * 100).to_i
  end

  def self.convert_to_dollars(amount)
    amount / 100.0
  end

  private

  def create_shares(shares, split)
    shares.each do |user_id, paid|
      BillShare.create!(
        due: split.first,
        paid: Bill.convert_to_cents(paid),
        bill_id: self.id,
        user_id: user_id
      )
      split.shift
    end
  end

  def calculate_split(num_shares)
    split = []
    num_shares.times { split << (total / num_shares) }

    remainder = total % num_shares
    until remainder == 0
      split.map! do |amount|
        break if remainder == 0
        remainder -= 1
        amount += 1
      end
    end
    split
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
        debtors[bill_share.user_id] = net * -1
      elsif net > 0
        creditors[bill_share.user_id] = net
      end
    end
  end

  def reconcile_debts_to_credits
    creditors.keys.each do |creditor_id|
      record_debts(creditor_id)
    end
  end

  def record_debts(creditor_id)
    debtors.each do |debtor_id, debt|
      credit = creditors[creditor_id]

      if credit > debt
        Debt.create!(amount: debt, creditor_id: creditor_id, debtor_id: debtor_id, bill_id: self.id)
        creditors[creditor_id] = credit - debt
        debtors.delete(debtor_id)
      else credit <= debt
        Debt.create!(amount: credit, creditor_id: creditor_id, debtor_id: debtor_id, bill_id: self.id)
        debt == credit ? debtors.delete(debtor_id) : debtors[debtor_id] = debt - credit
        creditors.delete(creditor_id)
        return nil
      end
    end
  end

  def format_total
    self.total = Bill.convert_to_cents(total)
  end
end
