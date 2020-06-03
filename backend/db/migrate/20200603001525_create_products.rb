class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name
      t.float :cost
      t.float :commission
      t.integer :sales
      t.string :type
      t.float :netPercentage

      t.timestamps
    end
  end
end
