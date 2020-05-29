class CalculatorsController < ApplicationController
    def index
        calculators = Calculator.all
        render json: calculators, except: [:created_at, :updated_at]
    end

    def show
        calculator = Calculator.find_by(id: params[:id])
        if calculator
          render json: { id: calculator.id, name: calculator.name, individualGoal: sprintf("%.2f",calculator.individualGoal), monthlyGoal: sprintf("%.2f",calculator.monthlyGoal) }
        else
          render json: { name: 'Calculator not found' }
        end
      end

end