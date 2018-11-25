class ApplicationController < ActionController::Base

    # Our fetch_user method will be run before ANY action of ANY controller
      # (because ApplicationController is the parent class of all of them)
      before_action :fetch_user

      private


      def check_if_logged_in
        unless @current_user.present?

        flash[:error] = "You must login to view that page."
        redirect_to login_path
      end

      end

      def fetch_user
        # Check if session[:user_id] is set, and also if it stores
        # a valid user ID, and if so, set an instance variable
        # containing the user object

        if session[:user_id].present?
          @current_user = User.find_by id: session[:user_id]
        end

        # Make sure we actually found a valid user (i.e. the user ID in
        # the session wasn't stale, from a deleted account)
        # and if we didn't get a valid user (in @current_user)
        # then we clear the session key
        session[:user_id] = nil unless @current_user.present?
      end
  end
