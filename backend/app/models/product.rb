class Product < ApplicationRecord
    belongs_to :calculator
    validates :netPercentage, numericality: { less_than: 100,  greater_than: 0 }
    validates :commission, numericality: { less_than: 100,  greater_than_or_equal_to: 0 }
    validates :cost, presence: true
    validates :name, presence: true
    validates :frequency, inclusion: {in: %w(individual monthly),
        message: "must be individual or monthly" }

end
