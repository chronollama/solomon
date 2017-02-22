@bill_shares.each do |share|
  bill = share.bill
  debts = share.debts

  json.set! bill.id do
    json.id bill.id
    json.category bill.category
    json.description bill.description
    json.total bill.total
    json.date bill.date
    json.notes bill.notes

    json.paid share.paid

    json.set! "debts" do
      debts.each do |debt|
        json.set! debt.id do
          json.id debt.id
          json.amount debt.amount
          json.debtor_id debt.debtor_id
          json.creditor_id debt.creditor_id
        end
      end
    end
  end
end
