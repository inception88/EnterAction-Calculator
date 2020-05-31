class CalculatorSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :individualGoal, :monthlyGoal
end