import React from 'react';
import History from './components/History'
import Expression from './components/Expression'
import { Button, Container, Grid, Paper, withStyles } from '@material-ui/core';
import ButtonItem from './components/ButtonItem';

const styles = () => ({
  calcWrapper: {
    marginTop: '50px'
  },
  calcPaper: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid rgba(100, 100, 111, 0.2)',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px'
  },
  buttonsWrapper: {
    marginTop: '20px',
  },
  btnBackend: {
    marginTop: '50px',
    textTransform: 'none'
  },
});

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      isCalcError: false,
      history: [],
      buttons: [
        '7', '8', '9', "C",
        '4', '5', '6', "+",
        '1', '2', '3', "-",
        '0', '=', '*', '/',
      ],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  handleClick(value) {
    switch (value) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        this.addValueToExpression(value);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.processMathOperator(value);
        break;
      case '=':
        this.calculateExpression();
        break;
      case 'C':
        this.setState({
          expression: '',
          isCalcError: false,
          history: [],
        });
        break;
    }
  }

  addValueToExpression(value) {
    if (this.state.isCalcError) {
      this.setState({
        expression: value,
        isCalcError: false,
      })
    } else {
      this.setState(prevExpression => ({
        expression: prevExpression.expression + value
      }));
    }
  }

  processMathOperator(mathOperator) {
    if (!this.state.expression) {
      return;
    }

    if (this.isMathOperator(this.state.expression.at(-1))) {
      this.setState({
        expression: this.state.expression.slice(0, -1) + mathOperator
      })
      return;
    }

    const leftOperandRegexp = /^(-?\d+|(-?\d+\.\d+))$/;
    if (this.state.expression.match(leftOperandRegexp)) {
      this.addValueToExpression(mathOperator)
      return;
    }

    this.calculateExpression(mathOperator);
  }

  isMathOperator(value) {
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
        return true;
      default:
        return false;
    }
  }

  calculateExpression(mathOperator = '') {
    // (-?\d+|(-?\d+\.\d+)) - integer or decimal number (optional negative)
    // ([+-/*]) - math operator: +, -, / or *
    // (\d+|(\d+\.\d+)) - integer or decimal number
    const fullExpressionRegexp = /^(-?\d+|(-?\d+\.\d+))([+-/*])(\d+|(\d+\.\d+))$/;

    const expressionMatcher = this.state.expression.match(fullExpressionRegexp);
    if (expressionMatcher) {
      const leftOperand = parseFloat(expressionMatcher[1]);
      const rightOperand = parseFloat(expressionMatcher[4]);
      const expressionOperator = expressionMatcher[3];

      let result;
      let isCalcError = false;
      let newExpression;
      let historyItem;

      switch (expressionOperator) {
        case '+':
          result = leftOperand + rightOperand;
          newExpression = result.toString() + mathOperator;
          historyItem = leftOperand + '+' + rightOperand + '=' + result;
          this.updateStateAfterCalc(newExpression, isCalcError, historyItem);
          break;
        case '-':
          result = leftOperand - rightOperand;
          newExpression = result.toString() + mathOperator;
          historyItem = leftOperand + '-' + rightOperand + '=' + result;
          this.updateStateAfterCalc(newExpression, isCalcError, historyItem);
          break;
        case '*':
          result = leftOperand * rightOperand;
          newExpression = result.toString() + mathOperator;
          historyItem = leftOperand + '*' + rightOperand + '=' + result;
          this.updateStateAfterCalc(newExpression, isCalcError, historyItem);
          break;
        case '/':
          if (rightOperand === 0) {
            result = 'Error division by zero';
            newExpression = result;
            isCalcError = true;
          } else {
            result = leftOperand / rightOperand;
            newExpression = result.toString() + mathOperator;
          }
          historyItem = leftOperand + '/' + rightOperand + '=' + result;
          this.updateStateAfterCalc(newExpression, isCalcError, historyItem);
          break;
      }
    }
  }

  updateStateAfterCalc(newExpression, isCalcError, historyItem) {
    this.setState({
      expression: newExpression,
      isCalcError: isCalcError,
      history: [
        historyItem,
        ...this.state.history
      ],
    });
  }

  render() {
    const {
      classes,
    } = this.props;
    const {
      history,
      expression,
      buttons,
    } = this.state;

    return (
      <Container
        maxWidth='xs'
        className={classes.calcWrapper}
      >
        <Paper className={classes.calcPaper}>
          <History expressions={history}/>
          <Expression value={expression}/>
          <Grid
            container
            className={classes.buttonsWrapper}
          >
            {buttons.map(buttonValue =>
              <ButtonItem
                key={buttonValue}
                value={buttonValue}
                onClick={(value) => this.handleClick(value)}
              />
            )}
          </Grid>

          <Button
            variant='contained'
            size='large'
            fullWidth={true}
            className={classes.btnBackend}
          >
            Get examples and solve
          </Button>
        </Paper>
      </Container>
    );
  }

}

export default withStyles(styles)(Calculator);
