json.extract! @bill,
  :id,
  :category,
  :description,
  :total,
  :date,
  :notes,
  :created_at,
  :updated_at,
  :debts
json.paid @bill.bill_shares.first.paid
