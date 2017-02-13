# Schema Information

## users
|     Column Name | Data Type | Details                   |
|----------------:|-----------|---------------------------|
| id              | integer   | not null, primary key     |
| username        | string    | not null, unique, indexed |
| email           | string    | not null, unique, indexed |
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
| complete      | boolean   | not null, default false|

## splits
|  Column Name | Data Type | Details                |
|-------------:|-----------|------------------------|
| id           | integer   | not null, primary key  |
| user_id      | integer   | not null, indexed      |
| bill_id      | integer   | not null, indexed      |
| split_type   | string    | not null               |
| split_amount | integer   |                        |
| paid         | boolean   | not null, default false|

## transactions
| Column Name | Data Type | Details               |
|------------:|-----------|-----------------------|
| id          | integer   | not null, primary key |
| amount      | decimal   | not null              |
| payer_id    | integer   | not null, indexed     |
| payee_id    | integer   | not null, indexed     |

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

## debts
| Column Name | Data Type | Details               |
|------------:|-----------|-----------------------|
| id          | integer   | not null, primary key |
| amount      | decimal   | not null              |
| debtor_id   | integer   | not null, indexed     |
| creditor_id | integer   | not null, indexed     |
