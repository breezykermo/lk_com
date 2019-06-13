import React from 'react'
import PropTypes from 'prop-types';
import Header from './Header'
import Sidebar from './Sidebar'
import Section from './Section'
import theme from './theme'

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
      <div className="col" style={styles.pageStyle}>
        <div className="row">
          <Header {...content.header} />
        </div>
        <div className="row">
          <div className="span4" style={{ marginRight: 0 }}>
            <Sidebar
              details={content.details}
              skills={content.skills}
            />
          </div>
          <div className="span8" style={{ marginRight: 0, marginTop: 20 }}>
              {allSections}
          </div>
        </div>
      </div>
    )
  }
}
Resume.propTypes = {
  content: PropTypes.object,
}

export default Resume
