import React, { PropTypes } from 'react'
import { Grid, Span } from 'react-responsive-grid'

const styles = {
  pillOuter: {
    padding: 0,
    margin: 0,
  },
  pillLeft: {
    fontSize: 10,
    lineHeight: '12px',
  },
  pillBody: {
    textAlign: 'left',
    margin: 0,
    padding: '0 5px',
  },
  subheader: {
    margin: '0 0 4px 0',
    fontSize: 16,
    lineHeight: '20px',
  },
  pillParagraph: {
    lineHeight: '18px',
    fontSize: 12,
  },
  pillRight: {
    fontSize: 10,
    lineHeight: '12px',
  },
}

const Pill = (props) => (
  <Grid columns={12} style={styles.pillOuter}>
    <Span columns={2} style={styles.pillLeft}>
      {props.left}
    </Span>
    <Span columns={8} style={styles.pillBody}>
      <h4 style={styles.subheader}>{props.body.title}</h4>
      <p style={styles.pillParagraph}>{props.body.content}</p>
    </Span>
    <Span columns={2} style={styles.pillRight}>
      {props.right}
    </Span>
  </Grid>
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
