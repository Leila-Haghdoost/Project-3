class UsersController < ApplicationController

  before_action :check_if_logged_in, only: [:get_collections, :edit]

  def get_collections
    render json: @current_user.collections.select(:id, :name)
  end


  def get_collections_with_movies
    render json: @current_user.collections, include: "movies"
  end



  def new
    @user = User.new

  end

  def create
      @user = User.create user_params   # strong params

      if @user.persisted?
        # Account created successfully!
        session[:user_id] = @user.id   # Log in the new user!!
        #added next 4 lines for Cloudinary image upload
        if params[:file].present?
          response= Cloudinary::Uploader.upload params[:file]
          @user.profile_image = response["public_id"]
          @user.save
        end
        redirect_to user_path(@user)   # go to the show page for this user
      else
        # Account not created: show error

        # Set a flash key to show on the next page: it will be an array of error strings
        flash[:errors] = @user.errors.full_messages
        redirect_to new_user_path  # /users/new, show the form again (with errors)
      end
  end

  def show
    @user = User.find params[:id]
  end



  def edit
    # @user = User.find params[:id]
    # if @user.id != @current_user.id
    #   #redirect_to root_path unless @user.id == @current_user.id
    #   flash[:error] = "You cannot edit another User"
    #   redirect_to root_path
    # end
    @user = @current_user

  end


  def update
    @user = User.find params[:id]   # route is PATCH "/members/:id", so we have the ID in params
    @user.update user_params
    if params[:file].present?
      response= Cloudinary::Uploader.upload params[:file]
      @user.profile_image = response["public_id"]
      @user.save
    end
    redirect_to user_path(@user.id)
  end

  def destroy
    @user = User.find params[:id]
    @user.destroy
    redirect_to( users_path )
  end


  private
  # strong params, the doorman for the form fields
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :profile_image)
  end


end # <!--class-->
