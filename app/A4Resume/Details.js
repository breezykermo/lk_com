import React from 'react'

const styles = {
  details: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listElement: {
    height: 20,
    padding: 0,
    marginBottom: 0,
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '5px',
    textAlign: 'right',
  },
  detail: {
    fontSize: 13,
  },
}

const formatDetail = (key, value) => {
  switch (key) {
    case 'email':
      return <a style={styles.detail} href={`mailto:${value}`}>{value}</a>
    case 'website': {
      const link = value.match(/^https?:\/\//) ? value : `http://${value}`
      return <a style={styles.detail} href={link}>{value}</a>
    }
    default:
      return value
  }
}

const Details = (props) => {
  const detailsList = Object.keys(props)
    .map(key => (
      <li key={key} style={styles.listElement}>
        {formatDetail(key, props[key])}
      </li>
    ))

  return (
    <div style={styles.details} >
      <ul style={styles.list}>
        {detailsList}
      </ul>
    </div>
  )
}

export default Details
