class FriendshipsController < ApplicationController

  # TODO: should this be params[:id] or nested params[:friend][:id]
  def create
    @user = User.find_by(friend_params)
    if @user
      @friendship = Friendship.new(user_id: current_user.id, friend_id: @user.id)
      if @friendship.save
        render 'api/users/show'
      else
        render json: @friendship.errors.full_messages, status: 422
      end

    else
      render json: @user.errors.full_messages, status: 404
    end
  end

  def destroy
    @friendship = Friendship.find_by(user_id: user_id, friend_id: params[:id])
    @friendship ||= Friendship.find_by(user_id: params[:id], friend_id: current_user.id)
    if @friendship
      @friendship.destroy
      redirect_to root_url
    else
      render json: @friendship.errors.full_messages, status: 422
    end
  end

  private
  def friend_params
    params.require(:friend).permit(:email)
  end
end
