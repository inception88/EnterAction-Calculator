Rails.application.routes.draw do
  resources :products
  resources :calculators do
    resources :products
  end
  get '/test', to: 'application#test'
end
