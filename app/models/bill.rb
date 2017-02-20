# == Schema Information
#
# Table name: bills
#
#  id          :integer          not null, primary key
#  category    :string           default("uncategorized"), not null
#  description :string           not null
#  total       :decimal(10, 2)   not null
#  date        :date             not null
#  notes       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Bill < ActiveRecord::Base
  validates :category, :description, :total, :date, presence: true
  validates :total, numericality: { :greater_than_or_equal_to: 0 }
  validates_format_of :total, with: /^\d+\.*\d{0,2}$/

  has_many :bill_shares

  has_many :users,
    through: :bill_shares,
    source: :user
end
