import React from 'react'
import data from './resume-data.json'
import A4Resume from './A4Resume'

class Resume extends React.Component {
  render () {
    return (
      <A4Resume content={data} />
    )
  }
}

export default Resume
