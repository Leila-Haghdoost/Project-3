Rails.application.routes.draw do

  root to: "pages#app"

  # entire React app happens inside this one Rails route
  get "/app" => "pages#app"

  # Session routes for login/logut
  get    "/login" => "session#new"     # login form
  post   "/login" => "session#create"  # form submits here to perform login and set session
  delete "/login" => "session#destroy" # logout (delete session)


  # AJAX routes will be here:
  # e.g. to get user's favourites:
  # get "/users/favourites" => "users#favourites" # this will return JSON
  get "/users/collections" => "users#get_collections"  # JSON
  get "/users/collections-movies" => "users#get_collections_with_movies"  # JSON
  post"/add-movie" => "movies#add_to_collection"

  resources :users, except: [ :index ]
  resources :collections
  resources :movies

end
