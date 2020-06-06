class CalculatorSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :individualGoal, :monthlyGoal
    has_many :products
    has_many :expenses
end