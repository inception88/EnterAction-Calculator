class CreateExpenses < ActiveRecord::Migration[5.2]
  def change
    create_table :expenses do |t|
      t.string :name
      t.float :cost
      t.string :frequency
      t.integer :quantity
      t.integer :calculator_id

      t.timestamps
    end
  end
end
