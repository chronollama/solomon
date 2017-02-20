Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :show]
    resource :session, only: [:create, :destroy]
    resources :friendships, only: [:create, :destroy, :index, :show]
    resources :bills, only: [:create, :destroy, :update, :show]
  end
end
