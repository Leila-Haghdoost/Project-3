class SessionController < ApplicationController
  def new
  end

  def create
    # see if the email address entered actually corresponds to a user in the table
    user = User.find_by email: params[:email]

    if user.present? && user.authenticate( params[:password] )
      # Successful login:
      # Get Rails to create a new session key to store the user's ID;
      # this is the session key which we will use to check if the user
      # is logged in on all future pages
      session[:user_id] = user.id
      redirect_to app_path( user.id )
    else
      # If the user cannot be authenticated, redirect them to the login_path.

      flash[:error] = "Invalid email address or password"

      redirect_to( login_path )
    end

  end

  def destroy
    session[:user_id] = nil  # this logs out the user
    redirect_to app_path
  end
end
