import React, { Component } from 'react'
import axios from 'axios'
import CollectionMoviesList from './CollectionMoviesList'
import {Link} from 'react-router-dom'
import icon from '../../images/icon.png';


const imageBaseURL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';


class CollectionsList extends Component {

    state = {
      collections: []
    };

    componentDidMount() {

      axios.get('/users/collections')
      .then( response => {
        this.setState({
          collections: response.data,
        })
      })
      .catch((error) => {
        console.error('show me the error', error);
      });

    }//componentDidMount


  render(){
    const {collections} = this.state
    const iconUrl = icon

    collections.forEach( c => console.log(c) );

    return(
      <div className="collectionBodycontainer">
        <div className="creationIconheare">
          <div className="collectionBtn">
            <a href='/collections/new' >Create New Collection</a>
          </div>
        </div>
        <div className="collectionWrapper">

          {collections.map(collection => {

            return <Link to={{
              pathname: `/collections/${collection.id}`
            }}>
            <div className="collectionIcon">
              { collection && collection.movies && collection.movies.length > 0 ?
                <img src={imageBaseURL + collection.movies[0].poster_path} className="iconUrl"/>
                :
                <img className="iconUrl"/>
              }
              <h4 className="collectionName">{collection.name}</h4><br/>
            </div>
          </Link>;

          })}
        </div>
        {/* <br/> */}


      </div>
    )
  }
}
export default CollectionsList;
