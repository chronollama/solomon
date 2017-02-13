# Component Hierarchy

**AuthFormContainer**
  -AuthForm
    -AuthError
    -CurrencySelection

**DashboardContainer**
  -Navbar
    -NavbarItem
    -Groups
    -Friends
    -FriendInvite
  -DashboardIndex
    -DashboardSummary
    -ListChartSelection
    -Debt
      -DebtItem
    -Credit
      -CreditItem
  -Sidebar
    -Promotional

**RecentActivityContainer**
  -Navbar
    -NavbarItem
    -Groups
    -Friends
    -FriendInvite
  -ActivityIndex
    -ActivityItem
  -Sidebar
    -Promotional

**ExpensesContainer**
  -Navbar
    -NavbarItem
    -Groups
    -Friends
    -FriendInvite
  -ExpenseIndex
    -ExpenseItem
  -Sidebar
    -Detail
      -DetailSelection
      -DetailItem

**FriendShowContainer**
  -Navbar
    -NavbarItem
    -Groups
    -Friends
    -FriendInvite
  -TransactionIndex
    -TransactionItem
  -Sidebar
    -Detail
      -DetailSelection
      -DetailItem

**CreateGroupContainer**
  -GroupForm
    -GroupMembers
      -AddPerson
    -AdvancedSettings

**AddBillContainer**
  -AddBillForm
    -Category
    -SplitDetails
    -Date
    -ImageNotes
    -GroupOptions

**SettleUpContainer**
  -SettleUpForm
    -TransactionParties
      -Payer
      -Payee
    -Date
    -ImageNotes
    -GroupOptions


# Routes
|                  Path | Component               |
|-----------------------|-------------------------|
| /signup               | AuthFormContainer       |
| /#/dashboard          | DashboardContainer      |
| /#/activity           | RecentActivityContainer |
| /#/all                | ExpensesContainer       |
| /#/friends/:id        | FriendShowContainer     |
| /#/friends/:id/bill   | AddBillContainer        |
| /#/friends/:id/settle | SettleUpContainer       |
| /groups/new           | CreateGroupContainer    |
