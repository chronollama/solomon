# Solomon

[Heroku][heroku]
[Trello][trello]

[heroku]: https://solomon-app.herokuapp.com/#/
[trello]: https://trello.com/b/X69sn8Qe/solomon-splitwise-clone

## Minimum Viable Product
Solomon is a clone of Splitwise, a web app designed to record shared expenses. Minimum features include:
* Creating and tracking bills
* Friending
* Transaction history
* Comments on bills and transactions
* Bonus: Groups
* Bonus: Fake "checkout"

## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: docs/wireframes
[components]: docs/component-hierarchy.md
[sample-state]: docs/sample-state.md
[schema]: docs/schema.md
[api-endpoints]: docs/api-endpoints.md

## Implementation Timeline

### Phase 1: User Model and Authentication (2 days)
**Objective:** Back-end and front-end authentication complete.

### Phase 2: Friend Association and Invitation (1 day)
**Objective:** Other users may be added or removed as friends, causing list of friends to update.

### Phase 3: Bills Model and Simplifying Debts (2 days)
**Objective:** Bills may be created, edited, viewed, or removed by associated parties with option to simplify debts.

### Phase 4: Transactions (2 days)
**Objective:** Transactions can be recorded and displayed. Bills can be marked as settled.

### Phase 5: Comments (2 days)
**Objective:** Comments can be added to transactions and bills. Form for commenting is available.

### Bonus Features:
* Groups: Users can join groups and track bills among them.
* Fake Checkout: Users can record cash payments or make payments via Paypal or Venmo.
* Currency Conversion: Users can convert currency according to up-to-date conversion rates.
