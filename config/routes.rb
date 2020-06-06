Rails.application.routes.draw do
  resources :expenses
  resources :products
  resources :calculators do
    resources :products
    resources :expenses
  end
end
