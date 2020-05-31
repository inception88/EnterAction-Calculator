class CalculatorsController < ApplicationController
    def index
        calculators = Calculator.all
        render json: CalculatorSerializer.new(calculators)
    end

    def show
        calculator = Calculator.find_by(id: params[:id])
        if calculator
            render json: CalculatorSerializer.new(calculator)
        else
          render json: { name: 'Calculator not found' }
        end
    end

    def create
        calculator = Calculator.create(name: params[:name])
        render json: CalculatorSerializer.new(calculator)
    end
end