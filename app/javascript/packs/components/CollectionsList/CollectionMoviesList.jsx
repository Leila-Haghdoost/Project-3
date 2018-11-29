import React, { Component } from 'react'
import axios from 'axios'
import MovieList from '../App/MovieList'
import {Link} from 'react-router-dom'


class CollectionMoviesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      collection: {},
      collectionsList:[],
    }

  }

  componentDidMount(){
    this.updateMovieList(); // load the movies once when the page first loads
    // Keep checking the server every 2 seconds to see if there are any new
    // movies to show on the page
    setInterval( () => this.updateMovieList(), 2000 );
    } //componentDidMount


  updateMovieList(){
    // get the current list of movies from the server
    axios.get(`/users/collections-movies`)
    .then( response => {
      const filteredCollection = response.data.find( collection => {
        return  collection.id === parseInt( this.props.match.params.collectionId );
      })
      // console.log(filteredCollection);
      this.setState({ collection: filteredCollection, collectionsList: response.data })
    })
    .catch((error) => {
      console.error(error);
    });
  } // updateMovieList()


//Delete Movie from collection movie list
  deleteMovieFromCollection = (movieID) => {
        const url = '/movies/';
        axios.delete(`${url}${movieID}`, {
          movie_id: movieID
        })
        .then(res => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }// DeleteMovieFromCollection



  //Delete collection from collection list
  deleteCollection = (collectionID) => {

    const url = '/collections/';
    axios.delete(`${url}${this.state.collection.id}`, {
      collection_id: this.state.collection.id
    })
    .then(res => {
      console.log(res.data);
      this.props.history.push("/collections");
      //when I delete the collection I go to collection path
    })
    .catch((err) => {
      console.log(err);
    });

  }


  render(){
    const collection = this.state.collection
    const collectionsList = this.state.collectionsList
    return(
      <div className="backAndDeleteCollection">

        <Link className="backAndDeleteCollection" to="/collections">Back to All Collections</Link>
         &nbsp;|&nbsp;
        <Link className="backAndDeleteCollection" to="#" onClick={() => this.deleteCollection() }>Delete Collection</Link>

        <h2>{collection.name}</h2>

        {/* /Check if Movie list exist/ */}
          {collection.movies &&
            <MovieList movies={collection.movies} userCollections={collectionsList} removeButton={this.deleteMovieFromCollection} />
          }
      </div>
    )
  }
}
export default CollectionMoviesList;
