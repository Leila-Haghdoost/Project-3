import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const MOVIE_DETAILS_BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '?api_key=f63e106e9e1f568053f10f646d2f3879'



class MovieDetail extends Component {

  constructor(){
    super();

    this.state = {
      movie: {},
      addedToCollectionMesage: '',
      userCollections: []
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

    if( this.props.location.userCollections === undefined ){
      // Get user collection list using AJAX request (same as in App/index.js)
      // if the userCollections array has not been passed into this component
      // (This will only be necessary when this route is loaded/refreshed directly,
      // instead of being reached by clicking on a movie search result)

      axios.get('/users/collections')
      .then( res => this.setState({ userCollections: res.data }) )
      .catch((error) => {
        console.error(error);
      });

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

    if( !this.state.movie.id ){
      // This means that the movie data has not loaded from the API request yet,
      // so show a loading message instead of movie info
      return <p>Loading...</p>;
    }

    const posterURL = `https://image.tmdb.org/t/p/w400/${this.state.movie.poster_path}`;


    let userCollections;
    if( this.state.userCollections && this.state.userCollections.length > 0) {
      // User was logged in, and reloaded the page - so userCollections was set
      // into state from AJAX request in componentDidMount()
      userCollections = this.state.userCollections;
    } else {
      // Otherwise the component was rendered from another route, so userCollections came
      // from props - BUT it might still be 'undefined' if the user was not logged in
      userCollections = this.props.location.userCollections;
    }

    // console.log('userCollections', userCollections);

    let addToCollection;

    if( userCollections === null || userCollections === undefined ){

      // this means the user is not logged in
      addToCollection = <p><a href="/login">Login</a> to add to a collection</p>;

    } else if( 'length' in userCollections && userCollections.length > 0 ){

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
      // Collections array is empty
      addToCollection = <p><Link to="/collections">Create a collection</Link> to add movies to it.</p>;
    }

    return(
      <div className="singleMovieContainer">
        <div className="movieRow">
          <div className="movieImage">
          <img  src={posterURL} />
          </div>
          <div className="movieInfo">
            <h2 className="movieTitle">{ this.state.movie.title}</h2>
            <div className="tagline">{ this.state.movie.tagline}</div>
            <br/>
            <div className="info"><strong>original_language:</strong> { this.state.movie.original_language}</div>
            <div className="info"><strong>status:</strong> { this.state.movie.status}</div>
            <div className="info"><strong>release_date:</strong> { this.state.movie.release_date}</div>
            <br/>
            <div className="overview"><strong>overview: </strong> { this.state.movie.overview}</div>
            <h4 className="">vote_average: { this.state.movie.vote_average}</h4>
            <h4 className="">vote_count: { this.state.movie.vote_count}</h4>

            { addToCollection }
            <p>{ this.state.addedToCollectionMesage }</p>
          </div>
        </div>
      </div>
    )
  }
}
export default MovieDetail;
