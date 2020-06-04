class Product < ApplicationRecord
    belongs_to :calculator
    validates :netPercentage, numericality: { less_than: 100,  greater_than: 0, only_integer: true }
    validates :commission, numericality: { less_than: 100,  greater_than_or_equal_to: 0, only_integer: true }
    validates :cost, presence: true
    validates :name, presence: true

end
