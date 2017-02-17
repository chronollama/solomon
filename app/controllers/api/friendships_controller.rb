class Api::FriendshipsController < ApplicationController
  def index
    @friends = current_user.friends
    render :index
  end

  def show
    @friend = User.find(params[:id])
    render :show
  end

  # TODO: should this be params[:id] or nested params[:friend][:id]
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
      render json: @friend.errors.full_messages, status: 404
    end
  end

  def destroy
    @friendship = Friendship.find_by(user_id: current_user.id, friend_id: params[:id])
    @friendship ||= Friendship.find_by(user_id: params[:id], friend_id: current_user.id)
    if @friendship
      @friendship.destroy
      @friends = current_user.friends
      render :index
    else
      render json: @friendship.errors.full_messages, status: 422
    end
  end

  private
  def friend_params
    params.require(:friend).permit(:email)
  end
end
