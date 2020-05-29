Rails.application.routes.draw do
  resources :calculators
  get '/test', to: 'application#test'
end
