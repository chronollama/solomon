class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    @current_user = user
    session[:session_token] = @current_user.reset_session_token
  end

  def logout
    current_user.reset_session_token
    @current_user = nil
    session[:session_token] = nil
  end

  # TODO: should this be private/protected? Users and Sessions controllers need to inherit
  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
