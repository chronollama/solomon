# API Endpoints

## HTML API

### Root

- `GET /`

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`
  - Only allow editing for current user's profile
- `GET /api/users/:id`
  - Only show if user is a friend of current user

### Session

- `POST /api/session`
- `DELETE /api/session`

### Groups

- `POST /api/groups`
- `PATCH /api/groups/:id`
- `GET /api/groups/:id`
- `DELETE /api/groups/:id`
  - Editing, showing, and removing are only available if current user is a member of the group

### Bills

- `POST /api/bills`
- `PATCH /api/bills/:id`
- `GET /api/bills/:id`
- `DELETE /api/bills/:id`
  - Editing, showing, and removing are only available if current user is a party to the transaction

### Friends

- `POST /api/friends`
- `DELETE /api/friends/:id`
  - Add and remove entries in friends association table

### Comments

- `POST /api/comments`
- `PATCH /api/comments/:id`
- `GET /api/comments/:id`
- `DELETE /api/comments/:id`

### Transactions
- `POST /api/:debt_id/transactions`
- `PATCH /api/:debt_id/transactions/:id`
- `GET /api/:debt_id/transactions/:id`
- `DELETE /api/:debt_id/transactions/:id`
