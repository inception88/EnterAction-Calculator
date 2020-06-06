class ApplicationController < ActionController::API

    def to_d(value)
        "$#{sprintf("%.2f", value)}"
    end
end