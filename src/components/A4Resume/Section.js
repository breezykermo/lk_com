import React, { PropTypes } from 'react'
import Pill from './Pill'
import theme from './theme'
import MarkdownIt from 'markdown-it'
import './resume.scss'

const md = new MarkdownIt()

const styles = {
  container: {
    paddingLeft: 20,
  },
  title: {
    fontWeight: '100',
    textAlign: 'right',
    padding: '0',
    margin: '0 1em',
  },
  hr: {
    margin: '0 0 15px 0',
    borderColor: theme.highlightColor,
    backgroundColor: theme.highlightColor,
    color: theme.highlightColor,
  },
  themed: {
    color: theme.mainColor,
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
      <h3 style={styles.title}>
        <span style={styles.themed}>{firstThreeLetters}</span><span>{restOfTitle}</span>
      </h3>
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
