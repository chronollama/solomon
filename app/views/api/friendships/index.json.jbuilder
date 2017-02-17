@friends.each do |friend|
  json.set! friend.id do
    json.id friend.id
    json.email friend.email
    json.name friend.name
  end
end
