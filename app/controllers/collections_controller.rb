class CollectionsController < ApplicationController

  def new
    @collection = Collection.new
  end

  def create
    @collection = Collection.create (collection_params)
    @collection.user_id = @current_user.id
    @collection.save
    redirect_to( app_path + '#collections' )
  end

  def index
    @collection = Collection.all

  end

  def show
    @collection = Collection.find params[:id]

  end


  def edit
    @collection = Collection.find params[:id]
  end


    def update
      @collection = Collection.find params[:id]
      @collection.update collection_params
    redirect_to collection_path(@collection.id)
    end

    def destroy
    @collection = Collection.find params[:id]
    @collection.destroy
    redirect_to  (collections_path)
    end

  private
  def collection_params
    params.require(:collection).permit(:name, :user_id)
  end

end
