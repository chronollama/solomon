@bills.each do |bill|
  json.set! bill.id do
    json.id bill.id
    json.category bill.category
    json.description bill.description
    json.total bill.total
    json.date bill.date
    json.notes bill.notes
    json.created_at bill.created_at
    json.updated_at bill.updated_at
  end
end
