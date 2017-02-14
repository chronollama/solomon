class Api::UsersController < ApplicationController
  # TODO: should the show renders be redirects to dashboard?
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.new(user_params)
    if @user.update
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show
    else
      render json: ['User not found'], status: 404
    end
  end
end
