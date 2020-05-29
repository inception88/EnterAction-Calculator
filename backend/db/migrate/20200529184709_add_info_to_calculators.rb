class AddInfoToCalculators < ActiveRecord::Migration[5.2]
  def change
    add_column :calculators, :individualGoal, :float
    add_column :calculators, :monthlyGoal, :float
  end
end
