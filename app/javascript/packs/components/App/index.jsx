import React, { Component } from 'react'
import axios from 'axios'
import Filters from './Filters'
import MovieList from './MovieList'
import { Link } from 'react-router-dom'


class App extends Component {
  state = {
    movies: [],
    keyword: null
  }
  componentDidMount() {

    axios.get('https://api.themoviedb.org/3/movie/top_rated?page=1&language=en-US&api_key=f63e106e9e1f568053f10f646d2f3879')
      .then( (response) => {
        this.setState({movies:response.data.results})
      })
      .catch((error) => {
        console.error(error);
      });

  }

  updateList = () => {
    const {keyword} = this.state
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&query=${keyword}&api_key=f63e106e9e1f568053f10f646d2f3879`

    axios.get(url)
      .then( (response) => {
        this.setState({movies:response.data.results})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {movies} = this.state

    return(
    <div className="row">
      <div className="side">
        <h2>This is the place for search filter</h2>
      </div>
      <div className="main">
        <div className="movieSearchName">
          <h2>Movie Search</h2>
          <Filters
            onkeywordChange={(input)=> {
              this.setState({keyword:input}, this.updateList )
          }}/>
        </div>
        <div>
          <MovieList movies={movies}/>
        </div>
      </div>
    </div>
    )
  }
}
export default App;
