Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :update, :show, :index]
    resources :bills, only: [:create, :destroy, :update, :index, :show]
    resources :friendships, only: [:create, :destroy, :index, :show]
  end
end
