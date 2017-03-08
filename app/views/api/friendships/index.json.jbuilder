@friends.each do |friend|
  json.set! friend.id do
    json.id friend.id
    json.email friend.email
    json.name friend.name
    json.net do
      if @balances[friend.id]
        json.status @balances[friend.id][:status]
        json.amount number_to_currency(
          Bill.convert_to_dollars(@balances[friend.id][:amount])
        )
      end
    end
  end
end
