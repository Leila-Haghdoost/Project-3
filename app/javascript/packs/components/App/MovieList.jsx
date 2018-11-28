import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MoviePreview from './MoviePreview'

class MovieList extends Component {

  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render () {
    const { movies } = this.props
    // console.log(movies);
    return (
      <div className="container">
        {movies.map(movie => {
          return (
            <MoviePreview key={movie.id} movie={movie} userCollections={this.props.userCollections} />
          )
        })}
      </div>
    )
  }
}

export default MovieList;
