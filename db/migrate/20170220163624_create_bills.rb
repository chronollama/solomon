class CreateBills < ActiveRecord::Migration[5.0]
  def change
    create_table :bills do |t|
      t.string :category, null: false, default: 'General'
      t.string :description, null: false
      t.integer :total, null: false
      t.date :date, null: false
      t.string :notes
      t.timestamps
    end

    create_table :bill_shares do |t|
      t.integer :due, null: false
      t.integer :paid, null: false
      t.integer :bill_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :bill_shares, [:bill_id, :user_id], unique: true

    create_table :debts do |t|
      t.integer :amount, null: false
      t.integer :debtor_id, null: false
      t.integer :creditor_id, null: false
      t.integer :bill_id, null: false
      t.timestamps
    end
    add_index :debts, [:debtor_id, :creditor_id, :bill_id], unique: true
  end
end
