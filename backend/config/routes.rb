Rails.application.routes.draw do
  resources :products
  resources :calculators
  get '/test', to: 'application#test'
end
