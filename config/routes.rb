Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'parks/index'
      get 'parks/create'
      get 'parks/show'
      get 'parks/destroy'
    end
  end
  get 'components/index'
  root 'components#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
