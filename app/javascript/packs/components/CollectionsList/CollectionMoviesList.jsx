import React, { Component } from 'react'
import axios from 'axios'
import MovieList from '../App/MovieList'


class CollectionMoviesList extends Component {
  state = {
    collection: {},
    collectionsList:[]
  }

  componentDidMount(){
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
  } //componentDidMount

  render(){
    const collection = this.state.collection
    const collectionsList = this.state.collectionsList
    return(
      <div>
        <h2>{collection.name}</h2>
        <a href=''>Delete</a>
        {/* /Check if Movie list exist/ */}
          {collection.movies &&
            <MovieList movies={collection.movies} userCollections={collectionsList}/>
          }
      </div>
    )
  }
}
export default CollectionMoviesList;
