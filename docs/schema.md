# Schema Information

## users
|     Column Name | Data Type | Details                   |
|----------------:|-----------|---------------------------|
| id              | integer   | not null, primary key     |
| email           | string    | not null, unique, indexed |
| name            | string    | not null                  |
| password_digest | string    | not null                  |
| session_token   | string    | not null, unique, indexed |

## friends
| Column Name | Data Type | Details               |
|------------:|-----------|-----------------------|
| id          | integer   | not null, primary key |
| user_id     | integer   | not null, indexed     |
| friend_id   | integer   | not null, indexed     |

## bills
|   Column Name | Data Type | Details                |
|--------------:|-----------|------------------------|
| id            | integer   | not null, primary key  |
| category      | string    | not null               |
| description   | string    | not null               |
| amount        | decimal   | not null               |
| date          | date      | not null               |
| image_notes   | string    |                        |
| group_options | string    | not null               |
| settled       | boolean   | not null, default false|

## debts
| Column Name | Data Type | Details                 |
|------------:|-----------|-------------------------|
| id          | integer   | not null, primary key   |
| amount_owed | decimal   | not null                |
| bill_id     | integer   | not null, indexed       |
| debtor_id   | integer   | not null, indexed       |
| creditor_id | integer   | not null, indexed       |

## transaction
| Column Name | Data Type | Details                 |
|------------:|-----------|-------------------------|
| id          | integer   | not null, primary key   |
| amount_paid | decimal   | not null                |
| debt_id     | integer   | not null, indexed       |

## comments
|    Column Name | Data Type | Details               |
|---------------:|-----------|-----------------------|
| id             | integer   | not null, primary key |
| body           | string    | not null              |
| user_id        | integer   | not null, indexed     |
| transaction_id | integer   | not null, indexed     |

## groups
| Column Name | Data Type | Details                 |
|------------:|-----------|-------------------------|
| id          | integer   | not null, primary key   |
| name        | string    | not null                |
| simplify    | boolean   | not null, default false |

## group_members
| Column Name | Data Type | Details               |
|------------:|-----------|-----------------------|
| id          | integer   | not null, primary key |
| user_id     | integer   | not null, indexed     |
| group_id    | integer   | not null, indexed     |
