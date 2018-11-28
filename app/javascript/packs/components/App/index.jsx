import React, { Component } from 'react'
import axios from 'axios'
import Filters from './Filters'
import MovieList from './MovieList'
import { Link } from 'react-router-dom'


class App extends Component {
  titleRef = React.createRef()

  state = {
    movies: [],
    filteredMovies: [],
    title: null,
    year: null,
    sort: null,
    selectedGenres: [],
    userCollections: []

  }
  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/movie/upcoming?page=1&language=en-US&api_key=f63e106e9e1f568053f10f646d2f3879')
      .then( (response) => {
        this.setState({
          movies: response.data.results,
          filteredMovies: [...response.data.results] // make a copy to use for filtering
        });
      })
      .catch((error) => {
        console.error(error);
      });


      // Load the list of collections for this user just once when we start the app
      // ....and pass it down through child components, and also via a Link tag's "state"
      // until it gets to MovieDetail, where we use it to populate the "Add to Collection"
      // dropdown
      axios.get('/users/collections')
      .then( res => this.setState({ userCollections: res.data }) )
      .catch((error) => {
        console.error(error);
      });


  }

  filterList = () => {
    const genres = this.state.selectedGenres;
    const year = this.state.year;
    // we always filter on the ORIGINAL API response which is in this.state.movies....
    // and we only display what is in this.state.filteredMovies
    const filteredMovies = this.state.movies.filter( m => {
      return genres.every( g => m.genre_ids.includes(g) ) &&   m.release_date.substring(0, 4) === year ;

    });
    this.setState({filteredMovies});
  }

  updateList = () => {
    const {year, sort, selectedGenres} = this.state
    const url = `https://api.themoviedb.org/3/discover/movie?&page=1&year=${year}&sort_by=${sort}&api_key=f63e106e9e1f568053f10f646d2f3879`

    axios.get(url)
      .then( (response) => {
        this.setState({
          movies:response.data.results,
          filteredMovies: [...response.data.results] // make a copy to use for filtering
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchByTitle = () => {
    const {title} = this.state

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&query=${title}&api_key=f63e106e9e1f568053f10f646d2f3879`

    axios.get(url)
      .then( (response) => {
        // console.log('got search results:', response.data);
        this.setState({
          movies: response.data.results,
          filteredMovies: [...response.data.results] // make a copy to use for filtering
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }





  render() {
    const {filteredMovies} = this.state

    return(
    <div className="row">
      <div className="side">
        <h2>Filter by:</h2>
        <Filters
          onYearChange={ (selectedYear)=> {
            this.setState({year:selectedYear}, this.filterList )}}
          onSortChange={(sortBy)=> {
            this.setState({sort:sortBy}, this.updateList )}}
          onGenreChange={ (selectedGenres)=> {
            this.setState({selectedGenres:selectedGenres}, this.filterList )}}
      />

      </div>
      <div className="main">
        <div className="movieSearchName">
          <h2>Movie Search</h2>
        </div>
        <input
          type={'text'}
          ref={this.titleRef}
          onChange={()=> {
            const input = this.titleRef.current.value
            this.setState({title:input}, this.searchByTitle )
        }}/>
        <MovieList movies={filteredMovies} userCollections={this.state.userCollections} />
      </div>
    </div>
    )
  }
}
export default App;
