@users.each do |user|
  json.set! user.id do
    json.id user.id
    json.name user.name
    json.email user.email
  end
end
