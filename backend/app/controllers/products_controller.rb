class ProductsController < ApplicationController
    def index
        products = Product.all
        if params[:calculator_id]
            products = Calculator.find(params[:calculator_id]).products
        end
        render json: ProductSerializer.new(products)
    end

    def create
        product = Product.new(product_params)
        if product.save
            render json: ProductSerializer.new(product) 
        else
            render json: {error: product.errors}
        end
    end

    private
     
    def product_params
        params.require(:product).permit(:name, :sales, :cost, :commission, :netPercentage, :frequency, :calculator_id)
    end
end
