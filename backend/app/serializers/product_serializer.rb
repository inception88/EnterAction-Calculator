class ProductSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :cost, :commission, :sales, :frequency, :netPercentage
    belongs_to :calculator
end