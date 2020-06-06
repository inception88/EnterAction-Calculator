class Calculator < ApplicationRecord
    validates :name, presence: true
    has_many :products
    has_many :expenses
end