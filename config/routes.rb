Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :show]
    resource :session, only: [:create, :destroy]
<<<<<<< HEAD
    resources :friendships, only: [:create, :destroy, :index, :show]
=======
    resources :friendships, only: [:create, :destroy]
>>>>>>> e1137f65017a917ab557ee2772c1d5ee7ec68985
  end
end
