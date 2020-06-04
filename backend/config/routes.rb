Rails.application.routes.draw do
  resources :products
  resources :calculators do
    resources :products
  end
end
