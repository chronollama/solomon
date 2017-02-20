class CreateBills < ActiveRecord::Migration[5.0]
  def change
    create_table :bills do |t|
      t.string :category, null: false, default: 'uncategorized'
      t.string :description, null: false
      t.decimal :total, null: false, precision: 10, scale: 2
      t.date :date, null: false
      t.string :notes
      t.timestamps
    end

    create_table :bill_shares do |t|
      t.decimal :due, null: false, precision: 10, scale: 2
      t.decimal :paid, null: false, precision: 10, scale: 2
      t.integer :bill_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :bill_shares, [:bill_id, :user_id], unique: true

    create_table :debts do |t|
      t.decimal :amount, null: false, precision: 10, scale: 2
      t.integer :debtor_id, null: false
      t.integer :creditor_id, null: false
      t.timestamps
    end
    add_index :debts, [:debtor_id, :creditor_id], unique: true
  end
end
