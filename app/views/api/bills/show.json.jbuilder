json.extract! @bill,
  :id,
  :category,
  :description,
  :date,
  :notes,
  :created_at,
  :updated_at
json.total number_to_currency(Bill.convert_to_dollars(@bill.total))
json.set! "debts" do
  json.set! @debt.id do
    json.id @debt.id
    json.amount number_to_currency(Bill.convert_to_dollars(@debt.amount))
    json.debtor_id @debt.debtor_id
    json.creditor_id @debt.creditor_id
  end
end
json.paid number_to_currency(Bill.convert_to_dollars(@bill_share.paid))
