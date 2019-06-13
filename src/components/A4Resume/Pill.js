import React from 'react'
import PropTypes from 'prop-types';

const styles = {
  pillOuter: {
    padding: 0,
    margin: 0,
  },
  pillLeft: {
    width: "16%",
    fontSize: 10,
    lineHeight: '12px',
  },
  pillBody: {
    width: "66%",
    textAlign: 'left',
    margin: 0,
    padding: '0 5px',
  },
  pillRight: {
    width: "16%",
    fontSize: 10,
    lineHeight: '12px',
  },
  subheader: {
    margin: '0 0 4px 0',
    fontSize: 16,
    lineHeight: '20px',
  },
  pillParagraph: {
    lineHeight: '16px',
    fontSize: 12,
  },
}

const Pill = (props) => (
  <div className="row" style={styles.pillOuter}>
    <div style={styles.pillLeft}>
      {props.left}
    </div>
    <div style={styles.pillBody}>
      <h4 style={styles.subheader}>{props.body.title}</h4>
      <p style={styles.pillParagraph}>{props.body.content}</p>
    </div>
    <div style={styles.pillRight}>
      {props.right}
    </div>
  </div>
)
Pill.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
  body: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
}

export default Pill
