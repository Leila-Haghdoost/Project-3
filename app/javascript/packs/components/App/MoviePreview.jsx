import React, { Component } from 'react'
import PropTypes from 'prop-types'

const imageBaseURL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'

class MoviePreview extends Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
  }

  render () {
    const {movie} = this.props
    return (
  
        <div className="item">
          <img  src={`${imageBaseURL}${movie.poster_path}`}  className="image"/>
          <div className="overlay">{movie.title}</div>
        </div>
    
    )
  }
}



export default MoviePreview;
