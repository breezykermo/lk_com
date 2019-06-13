import React from 'react';
import PropTypes from 'prop-types';
import theme from '../theme';

const styles = {
  header: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.headerColor,
    padding: '5px',
    marginBottom: 10,
  },
  name: {
    color: 'white',
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
    fontSize: 28,
    fontWeight: '100',
    lineHeight: '0.8',
  },
  weighted: {
    fontWeight: 'bold',
    color: theme.mainColor,
  },
  smaller: {
    fontSize: '16px',
    color: theme.highlightColor,
  },
}

const Header = (props) => {
  const firstName = props.name.split(' ')[0]
  const lastName = props.name.split(' ')[1]

  return (
    <div style={styles.header}>
      <h2 style={styles.name}>
        {firstName}<span style={styles.weighted}>{lastName}</span> <br />
        <small style={styles.smaller}>{props.profession}</small>
      </h2>
    </div>
  )
}
Header.propTypes = {
  name: PropTypes.string,
  profession: PropTypes.string,
}

export default Header
