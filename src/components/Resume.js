import React from 'react'
import PropTypes from 'prop-types';
import data from './resume-data.json'
import A4Resume from './A4Resume'

class Resume extends React.Component {
  static propTypes = {
    aProp: PropTypes.string,
  }

  render () {
    return (
      <A4Resume content={data} />
    )
  }
}

export default Resume
