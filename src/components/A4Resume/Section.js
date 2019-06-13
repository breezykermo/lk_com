import React from 'react'
import PropTypes from 'prop-types';
import Pill from './Pill'
import theme from '../theme'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const styles = {
  container: {
    paddingLeft: 20,
    color: theme.textColor,
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'right',
    padding: '0',
    margin: '0 1em 5px 1em',
  },
  hr: {
    margin: '0 0 15px 0',
    borderColor: theme.headerColor,
    backgroundColor: theme.headerColor,
    color: theme.headerColor,
  },
  themed: {
    color: theme.highlightColor,
  },
}

const Section = (props) => {
  const firstThreeLetters = props.title.substring(0, 3).toLowerCase()
  const restOfTitle = props.title.substring(3).toLowerCase()

  // content can be an array of Pills or a SectionContent
  const content = props.pills
    ? props.pills.map((pillProps, index) => <Pill key={index} {...pillProps} />)
    : (
    <div>
      <div dangerouslySetInnerHTML={{ __html: md.render(props.content) }} />
    </div>
    )

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>
        <span style={styles.themed}>{firstThreeLetters}</span><span>{restOfTitle}</span>
      </h4>
      <hr style={styles.hr} />
      <div className={'innerMarkdown'}>
        {content}
      </div>
    </div>
  )
}
Section.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  pills: PropTypes.array,
}

export default Section
