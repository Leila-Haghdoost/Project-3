import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

class Filters extends Component {
  yearRef = React.createRef()
  sortRef = React.createRef()

    state = {
    years: [],
    sortOptions: {},
    genres:[],
    selectedGenres: []
  }

  static propTypes = {
    onYearChange: PropTypes.func,
    onSortChange: PropTypes.func,
    onGenreChange: PropTypes.func,
  }

  componentDidMount() {
    const yearDiff = (new Date()).getFullYear() - 1900
    const years = Array.from({length: yearDiff + 1}, (v, k) => k+1900).reverse();
    const sortOptions = {
      ['popularity.asc']: 'Popularity Ascending',
      ['popularity.desc']: 'Popularity Descending',
      ['release_date.asc']: 'Release Date Ascending',
      ['release_date.desc']: 'Release Date Descending',
      ['revenue.asc']: 'Revenue Ascending',
      ['revenue.desc']: 'Revenue Descending',
      ['primary_release_date.asc']: 'Primary Release Date Ascending',
      ['primary_release_date.desc']: 'Primary Release Date Descending',
      ['original_title.asc']: 'Title[A-Z]',
      ['original_title.desc']: 'Title[Z-A]',
      ['vote_average.asc']: 'Vote Average Ascending',
      ['vote_average.desc']: 'Vote Average Descending',
      ['vote_count.asc']: 'Vote Count Ascending',
      ['vote_count.desc']: 'Vote Count Descending'
    }
    this.setState({years, sortOptions})

    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=f63e106e9e1f568053f10f646d2f3879`
    axios.get(url)
      .then( (response) => {
        this.setState({genres:response.data.genres})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateSelectedGenres = (ev) => {
      const value = parseInt(ev.target.value);
      let {selectedGenres} = this.state
      if(selectedGenres.includes(value)){
        const index = selectedGenres.indexOf(value)
        selectedGenres = [...selectedGenres.slice(0,index), ...selectedGenres.slice(index + 1)]
      } else {
        selectedGenres.push(value)
      }
      this.setState({selectedGenres},
      this.props.onGenreChange(selectedGenres))
  }

  render () {
    const {years, sortOptions, genres} = this.state
    return (
      <div>
        <div>

          {genres.map(genre => {
            return (
            <div key={genre.id}>
              <input
                id={`genre-${genre.id}`}
                type="checkbox"
                name={`genre-${genre.id}`}
                value={genre.id}
                ref={input => { this[`genre${genre.id}Ref`] = input; }}
                onClick={this.updateSelectedGenres}
              />
              <label htmlFor="genre">{genre.name}</label>
              <br/>
            </div>
            )
          })}
        </div>
        <div>
          <label htmlFor="year">Year </label>
          <select id="year"
            ref={this.yearRef}
            onChange={()=>{
              const year = this.yearRef.current.value
              this.props.onYearChange(year)
            }}
          >
            {years.map(year => {
              return <option key={year} value={year}>{year}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="sort">Sort </label>
          <select id="sort"
            ref={this.sortRef}
            onChange={()=>{
              const sort = this.sortRef.current.value
              this.props.onSortChange(sort)
            }}
          >
            {Object.entries(sortOptions).map(sortOption => {
              return <option  key={sortOption[0]} value={sortOption[0]}>{sortOption[1]}</option>
            })}
          </select>
        </div>
      </div>
    )
  }
}

export default Filters;
