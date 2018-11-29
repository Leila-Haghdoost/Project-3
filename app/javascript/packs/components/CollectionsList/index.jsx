import React, { Component } from 'react'
import axios from 'axios'
import CollectionMoviesList from './CollectionMoviesList'
import {Link} from 'react-router-dom'
import icon from '../../images/icon.png';



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
    return(
      <div className="collectionBodycontainer">
        <div className="collectionWrapper">
          {collections.map(collection => {

            return <Link to={{
              pathname: `/collections/${collection.id}`
            }}>
            <div className="collectionIcon">
              <img src={iconUrl} className="iconUrl"/>
              <h4 className="collectionName">{collection.name}</h4><br/>
            </div>
          </Link>;

          })}
        </div>
        <button className="collectionBtn"><a href='/collections/new'>Create New Collection</a></button>

      </div>
    )
  }
}
export default CollectionsList;
