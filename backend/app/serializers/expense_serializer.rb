class ExpenseSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :cost, :quantity, :frequency
    belongs_to :calculator
end