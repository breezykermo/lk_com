import React from 'react'
import PropTypes from 'prop-types';
import theme from '../theme'

const styles = {
  container: {
    marginLeft: '6px',
    color: theme.textColor,
  },
  hr: {
    margin: '5px',
    borderColor: theme.headerColor,
    backgroundColor: theme.headerColor,
    color: theme.headerColor,
  },
  header: {
    fontSize: 20,
    marginTop: '0rem',
    marginBottom: '5px',
  },
  listing: {
    lineHeight: '14px',
    fontSize: 12,
    marginBottom: 5,
  },
}

const formatType = (text) => {
  const mostOfType = text.substring(0, text.length - 3)
  const lastThreeChars = text.substring(text.length - 3)
  return (
    <span>
      {mostOfType}
      <span style={{ color: theme.highlightColor }}>
        {lastThreeChars}
      </span>
    </span>
  )
}

const Skill = (props) => (
  <div style={styles.container}>
    <h4 style={styles.header}>{formatType(props.name)}</h4>
    <hr style={styles.hr} />
    <ul>
      {props.values.map(value => <li style={styles.listing} key={value}>{value}</li>)}
    </ul>
  </div>
)
Skill.propTypes = {
  values: PropTypes.array.isRequired,
  name: PropTypes.string,
}

export default Skill