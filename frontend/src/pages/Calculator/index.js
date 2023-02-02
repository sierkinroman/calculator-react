import React from 'react';
import Calculator from "./containers/Calculator";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import examplesReducer from './reducers/examples';

const store = createStore(
  examplesReducer,
  applyMiddleware(thunkMiddleware),
);

const App = () => {
  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  )
};

export default App;