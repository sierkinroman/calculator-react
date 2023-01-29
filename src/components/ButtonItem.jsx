import React from 'react'
import { Button, Grid, withStyles } from '@material-ui/core';

const styles = () => ({
  btn: {
    fontSize: '20px',
    borderRadius: '0',
    backgroundColor: '#f2f2f2',
  },
});

class ButtonItem extends React.Component {
  render() {
    const {
      value,
      onClick,
      classes
    } = this.props;

    return (
      <Grid item xs={3}>
        <Button
          variant='contained'
          size='large'
          fullWidth={true}
          className={classes.btn}
          onClick={() => onClick(value)}
        >
          {value}
        </Button>
      </Grid>
    );
  }
}

export default withStyles(styles)(ButtonItem);