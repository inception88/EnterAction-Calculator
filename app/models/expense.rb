class Expense < ApplicationRecord
    belongs_to :calculator
    validates :cost, presence: true
    validates :name, presence: true
    validates :frequency, inclusion: {in: %w(individual monthly),
        message: "must be individual or monthly" }
end
