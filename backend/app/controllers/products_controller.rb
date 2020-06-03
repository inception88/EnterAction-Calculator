class ProductsController < ApplicationController
    def index
        products = Product.all
        if params[:calculator_id]
            products = Calculator.find(params[:calculator_id]).products
        end
        render json: ProductSerializer.new(products)
    end
end
