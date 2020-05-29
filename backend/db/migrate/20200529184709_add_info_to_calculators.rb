class AddInfoToCalculators < ActiveRecord::Migration[5.2]
  def change
    add_column :calculators, :individualGoal, :float, default: 0
    add_column :calculators, :monthlyGoal, :float, default: 0
  end
end
