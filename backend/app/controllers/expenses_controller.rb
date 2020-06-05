class ExpensesController < ApplicationController
    def index
        expenses = Expense.all
        if params[:calculator_id]
            expenses = Calculator.find(params[:calculator_id]).expenses
        end
        render json: ExpenseSerializer.new(expenses)
    end

    def create
        expense = Expense.new(expense_params)
        if expense.save
            render json: ExpenseSerializer.new(expense) 
        else
            render json: {data: {error: expense.errors}}
        end
    end

    def update
        expense = Expense.find(params[:id])
        if expense.update(expense_params)
            render json: ExpenseSerializer.new(expense)
        else
            render json: {data: {error: expense.errors}}
        end
    end

    def destroy
        expense = Expense.find(params[:id])
        expense.destroy
        render json: {id: params[:id]}
    end

    private
    
    def expense_params
        params.require(:expense).permit(:name, :cost, :quantity, :frequency, :calculator_id)
    end
end
