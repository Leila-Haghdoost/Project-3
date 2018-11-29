import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ImgNotAvailable from '../../images/ImgNotAvailable.png';

const imageBaseURL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'

class MoviePreview extends Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
  }


  render () {
    const {movie} = this.props
    let imgURL
    if (movie.poster_path){
      imgURL = `${imageBaseURL}${movie.poster_path}`
    } else {
      imgURL = `${ImgNotAvailable}`
    }
    return (
        <div className="item">
          <Link to={{
            pathname: `/movie/${movie.id}`,
            userCollections: this.props.userCollections
          }}>
            <img  src={imgURL}  alt={movie.title}  className="image"/>
          </Link>
          <div className="overlay">{movie.title}</div>
          {/*
            userCollections is only present if a user has logged in, so this is really a test that
            only shows the Remove button if the user is logged in AND this MoviePreview->MovieList is
            being rendered from the Collections
          */}
          { (this.props.userCollections && this.props.removeButton)
            && <button onClick={() => this.props.removeButton(movie.id)}>Remove</button> }
        </div>
    )
  }
}



export default MoviePreview;
