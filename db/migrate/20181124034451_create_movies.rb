class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.integer :themoviedb_id
      t.text :title
      t.text :backdrop_path
      t.text :overview
      t.text :poster_path
      t.text :release_date
      t.integer :collection_id

      t.timestamps
    end
  end
end
