json.partial! 'api/users/user', user: @friend

json.set! "net" do
  json.status @net[:status]
  json.amount number_to_currency(Bill.convert_to_dollars(@net[:amount]))
end
