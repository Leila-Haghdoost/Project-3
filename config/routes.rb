Rails.application.routes.draw do

    resources :users, except: [ :index ]

    # Session routes for login/logut
    get    "/login" => "session#new"     # login form
    post   "/login" => "session#create"  # form submits here to perform login and set session
    delete "/login" => "session#destroy" # logout (delete session)







  # AJAX routes will be here:
  # e.g. to get user's favourites:
  get "/users/favourites" => "users#favourites" # this will return JSON

  root to: "pages#app"

  # entire React app happens inside this one Rails route
  get "/app" => "pages#app"

end
