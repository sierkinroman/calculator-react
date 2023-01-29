import React from 'react';
import Calculator from "./pages/Calculator";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import examplesReducer from './pages/Calculator/reducers/examples';

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