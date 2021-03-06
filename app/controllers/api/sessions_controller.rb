class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ["Invalid email or password"], status: 401
    end
  end

  def destroy
    if logged_in?
      logout
      render json: {}
    else
      render json: ["No user currently logged in"], status: 404
    end
  end
end
