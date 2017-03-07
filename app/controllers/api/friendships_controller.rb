class Api::FriendshipsController < ApplicationController
  before_action :ensure_friends, only: [:show, :destroy]

  def index
    if params[:query]
      @friends = current_user.search_friends(params[:query])
    else
      @friends = current_user.friends
    end
    render :index
  end

  def show
    @friend = User.find(params[:id])
    @net = Debt.net(current_user.id, @friend.id)
    render :show
  end

  def create
    @friend = User.find_by(friend_params)
    if @friend
      @friendship = Friendship.new(user_id: current_user.id, friend_id: @friend.id)
      if @friendship.save
        render :show
      else
        render json: @friendship.errors.full_messages, status: 422
      end

    else
      render json: ["User not found"], status: 404
    end
  end

  def destroy
    friendship = Friendship.find_by_users(current_user.id, params[:id])
    if friendship
      Friendship.destroy(friendship.id)
      @friend = User.find(params[:id])
      render :show
    else
      render json: friendship.errors.full_messages, status: 422
    end
  end

  private
  def friend_params
    params.require(:friend).permit(:email)
  end

  def ensure_friends
    unless Friendship.exists?(current_user.id, params[:id])
      render json: ["Friend not found"], status: 404
    end
  end
end
