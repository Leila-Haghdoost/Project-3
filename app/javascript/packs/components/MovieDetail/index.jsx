import React, { Component } from 'react'
import axios from 'axios'
// import MovieShowPage from './MovieShowPage'

const MOVIE_DETAILS_BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '?api_key=f63e106e9e1f568053f10f646d2f3879'



class MovieDetail extends Component {

  constructor(){
    super();

    this.state = {
      movie: {},
      addedToCollectionMesage: ''
    };
  }

  componentDidMount(){

    const url = MOVIE_DETAILS_BASE_URL + this.props.match.params.movieId + API_KEY;

    axios.get(url)
    .then( response => {
      // console.log('got search results:', response.data);
      this.setState({
        movie: response.data,
      })
    })
    .catch((error) => {
      console.error('movie lookup error', error);
    });

    if( !this.props.location.userCollections ){
      // Get user collection list using AJAX request (same as in App/index.js)
      // if the userCollections array has not been passed into this component
      // (This will only be necessary when this route is loaded/refreshed directly,
      // instead of being reached by clicking on a movie search result)

    }

  } //componentDidMount



  addToCollection = event => {
    const collectionID =  event.target.value;

    axios.post('/add-movie', {
      collection_id: collectionID,
      themoviedb_id: this.state.movie.id,
      title: this.state.movie.title,
      poster_path: this.state.movie.poster_path,
      release_date: this.state.movie.release_date
    })
    .then( response => {
      if( response.data.status === 'SUCCESS' ){
        this.setState({addedToCollectionMesage: 'Added successfully!'});
      } else if ( response.data.error ){
        this.setState({addedToCollectionMesage: "Already in collection"});
      }
    })
    .catch( console.error );


  }

  render(){

    const url = this.state.movie.poster_path ? `https://image.tmdb.org/t/p/w400/${this.state.movie.poster_path}`:
    ''

    const userCollections = this.props.location.userCollections;

    let addToCollection;

    if( userCollections ){
      addToCollection = (
        <div>
          Add to Collection:
          <select value="-1" onChange={ this.addToCollection }>
            <option value="-1" disabled>Choose...</option>
            { userCollections.map( c => (
              <option value={c.id} key={c.id}>{ c.name }</option>
            )) }
          </select>
        </div>
      );
    } else {
      addToCollection = <p>Create a collection to add movies to it.</p>;
    }

    return(
      <div>
        <div className="row">
          <div className="movieImage">
          <img  src= {url} />
          </div>
          <div className="movieInfo">
            <h4>Title: { this.state.movie.title}</h4>
            <h4>tagline: { this.state.movie.tagline}</h4>
            <h4>director: { this.state.movie.director}</h4>
            <h4>original_language: { this.state.movie.original_language}</h4>
            <h4>status: { this.state.movie.status}</h4>
            <h4>release_date: { this.state.movie.release_date}</h4>
            <h4>overview: { this.state.movie.overview}</h4>
            <h4>vote_average: { this.state.movie.vote_average}</h4>
            <h4>vote_count: { this.state.movie.vote_count}</h4>

            { addToCollection }
            <p>{ this.state.addedToCollectionMesage }</p>
          </div>
        </div>
      </div>
    )
  }
}
export default MovieDetail;
