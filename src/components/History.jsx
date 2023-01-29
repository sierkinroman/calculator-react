import React from 'react'
import { List, ListItemText, withStyles } from '@material-ui/core';

const styles = () => ({
  list: {
    height: '160px',
    overflow: 'auto',
  },
  itemWrapper: {
    fontSize: '20px',
    '&:first-child': {
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  },
  item: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },
});

class History extends React.Component {
  render() {
    const {
      expressions,
      classes
    } = this.props;

    return (
      <List className={classes.list}>
        {
          expressions.map((expression, i) =>
            <ListItemText
              classes={{
                root: classes.itemWrapper,
                primary: classes.item,
              }}
              primary={expression}
              key={i}
            />
          )
        }
      </List>
    );
  }
}

export default withStyles(styles)(History);