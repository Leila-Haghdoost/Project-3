class MoviesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def add_to_collection

     movie = Movie.find_by( themoviedb_id: params[:themoviedb_id] )
     collection = Collection.find params[:collection_id]

     # 1. try to find the movie by themoviedb_id
     #    - if it is found, then use that existing movie to add to collection
     #    - if it's not found, create it first, and then add to the collection
     unless movie.present?
       # movie does not exist in DB yet
       movie = Movie.create(
         themoviedb_id: params[:themoviedb_id],
         title: params[:title],
         poster_path: params[:poster_path]
       )
     end

     # 2. check that the movie is not already in the collection before adding it!
     if collection.movies.include? movie
       render json: {error: 'Movie already existed in your collection', status: 'FAILED'}
     else
       collection.movies << movie
       render json: {status: 'SUCCESS'}
     end

  end # add_to_collection


  def new
    @movie = Movie.new
  end


  def index
    @movie = Movie.all
  end

  def show
    @movie = Movie.find params[:id]

  end


  def edit

  end


  def update

  end

  def destroy
  @movie = Movie.find params[:id]
  @movie.destroy
  redirect_to  (movies_path)
  end

    private
  def movie_params
    params.require(:movie).permit(:title, :collection_id, :user_id)
  end



end
