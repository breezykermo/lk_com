import React, { PropTypes } from 'react'

import Header from './Header'
import Sidebar from './Sidebar'
import Section from './Section'
import theme from './theme'

import { Grid, Span } from 'react-responsive-grid'

import resumeData from './resumeStructure.example'

const styles = {
  pageStyle: {
    background: theme.backgroundColor,
    width: '21cm',
    height: '29.7cm',
    boxShadow: '0 0 0.8cm rgba(0,0,0,0.3)',
    marginBottom: 100,
  },
}

class Resume extends React.Component {
  render () {
    const { content } = this.props
    const allSections = []
    content.sections.forEach((sectionProps, key) => {
      allSections.push(<Section key={key} id={key} {...sectionProps} />)
    })

    return (
      <Grid columns={12} style={styles.pageStyle}>
        <Span columns={12}>
          <Header {...content.header} />
        </Span>
        <Span columns={4} style={{ marginRight: 0 }}>
          <Sidebar
            details={content.details}
            skills={content.skills}
          />
        </Span>
        <Span columns={8} style={{ marginRight: 0, marginTop: 20 }}>
            {allSections}
        </Span>
      </Grid>
    )
  }
}
Resume.propTypes = {
  content: PropTypes.object,
}

export default Resume
