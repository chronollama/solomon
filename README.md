# Solomon

[Solomon][solomon] is a bill-splitting app inspired by Splitwise built with Ruby on Rails and a React.js/Redux architecture. It allows users to record expenses with friends and determines the amount each person needs to pay back or receive in order to split the cost equally.

## Features and Implementation

### Recording Bills

The bill creation form includes an expandable section where additional parties can be added to an expense in order to include them in the split calculations. When a bill is submitted, it triggers a cascade of actions across the `Bill`, `BillShare`, and `Debt` models via the `make_records` method. This method uses a transaction to ensure that the input must pass a series of validations before the server saves it to the database. These steps are necessary to maintain database integrity with the financial information that is being stored.

First, the reported amount paid by each party must add up to the bill total itself or the submission is rejected. The bill model then verifies the presence and format of important fields before new bill shares are created. If those shares are validated, the `reconcile_debts_to_credits` method matches debtors to creditors, splitting a single debtor's payment among multiple creditors if necessary. This records multiple debts to the database and concludes the transaction.

```rb
def make_records(shares, bill_params = nil)
  success = false
  Bill.transaction do
    bill_params ? self.update(bill_params) : self.save!
    split = calculate_split(shares.length)
    create_shares(shares, split) # Records each party to the expense and the amount they paid
    aggregate_differences # Separates debtors and creditors
    reconcile_debts_to_credits # Matches debtors with creditors and records amount owed to each
    success = true
  end
  success
end
```

### Calculating Debts

Accurate debt calculation is Solomon's cornerstone feature. The `calculate_split` method divides the bill total among the number of associated shares and distributes any remainder cent by cent. In some cases, this results in an unavoidably unequal split where parties may have to pay an additional cent.
```rb
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

# Given a bill total of 800 ($8 converted to cents)
calculate_split(3) #=> [267, 267, 266]
```

After creditors and debtors are determined, 
```rb
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
```

calculation
getting net with particular friend
getting overall balance of debts and credits

### Friending

search
friends list
made available to split bills with



### Features Summary

* Create account/Log in/Log out
* Record and remove bills
* Calculate debts
* Add friends and view expenses shared with them
* Summarize balance

[solomon]: http://www.solomon-app.us/
