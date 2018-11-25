import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Filters extends Component {
  keywordRef = React.createRef()

  static propTypes = {
      onkeywordChange: PropTypes.func,
    }

  render () {
    const {onkeywordChange} = this.props
    return (
      <div>
        <input
          type={'text'}
          ref={this.keywordRef}
          onChange={() => {
            onkeywordChange(this.keywordRef.current.value);
          }}
        />
      </div>
    )
  }
}

export default Filters;
