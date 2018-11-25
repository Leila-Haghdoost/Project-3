class CreateCollectionsMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :collections_movies do |t|
      t.integer :collection_id
      t.integer :movie_id
    end
  end
end
