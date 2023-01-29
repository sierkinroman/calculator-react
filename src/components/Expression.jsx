import React from 'react'
import { TextField, withStyles } from '@material-ui/core';

const styles = () => ({
  expressionWrapper: {
    marginTop: '10px',
  },
  expression: {
    fontSize: '24px',
  },
});

class Expression extends React.Component {
  render() {
    const {
      value,
      classes
    } = this.props;

    return (
      <TextField
        value={value}
        variant='outlined'
        InputProps={{
          readOnly: true,
          className: classes.expression
        }}
        fullWidth={true}
        className={classes.expressionWrapper}
      />
    );
  }
}

export default withStyles(styles)(Expression);