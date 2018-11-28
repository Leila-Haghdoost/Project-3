import React, { Component } from 'react'
import axios from 'axios'
import CollectionMoviesList from './CollectionMoviesList'
import {Link} from 'react-router-dom'



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


    return(
      <div>
        <ul>
        {collections.map(collection => {
          return <li><Link to={{
            pathname: `/collections/${collection.id}`
          }}>{collection.name}</Link></li>;
        })}
        </ul>
        <button><a href='/collections/new'>Create New Collection</a></button>
      </div>
    )
  }
}
export default CollectionsList;
