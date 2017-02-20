# Schema Information

## users
| Column Name     | Data Type | Details                   |
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
| Column Name   | Data Type | Details                |
|--------------:|-----------|------------------------|
| id            | integer   | not null, primary key  |
| category      | string    | default 'uncategorized'|
| description   | string    | not null               |
| total         | decimal   | not null, scale: 2     |
| date          | date      | not null               |
| notes         | string    |                        |
| group_options | string    | not null               |

## bill_shares
| Column Name | Data Type | Details                 |
|------------:|-----------|-------------------------|
| id          | integer   | not null, primary key   |
| due         | decimal   | not null, scale: 2      |
| paid        | decimal   | not null, scale: 2      |
| bill_id     | integer   | not null, indexed       |
| user_id     | integer   | not null, indexed       |

## debts
| Column Name | Data Type | Details                 |
|------------:|-----------|-------------------------|
| id          | integer   | not null, primary key   |
| debtor_id   | integer   | not null, indexed       |
| creditor_id | integer   | not null, indexed       |
| amount      | decimal   | not null, scale: 2      |

## transaction
| Column Name | Data Type | Details                 |
|------------:|-----------|-------------------------|
| id          | integer   | not null, primary key   |
| amount      | decimal   | not null, scale: 2      |
| date        | date      | not null                |
| payer_id    | integer   | not null, indexed       |
| recipient_id| integer   | not null, indexed       |

## comments
| Column Name    | Data Type | Details               |
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
