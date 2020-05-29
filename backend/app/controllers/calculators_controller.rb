class CalculatorsController < ApplicationController
    def index
        calculators = Calculator.all
        render json: calculators, except: [:created_at, :updated_at]
    end
end
