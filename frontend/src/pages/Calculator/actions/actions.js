import { ERROR_RECEIVE_EXAMPLES, RECEIVE_EXAMPLES, REQUEST_EXAMPLES } from "../constants/actionTypes";

const requestExamples = () => ({
  type: REQUEST_EXAMPLES,
});

const receiveExamples = examples => ({
  type: RECEIVE_EXAMPLES,
  examples,
});

const errorReceiveExamples = () => ({
  type: ERROR_RECEIVE_EXAMPLES,
});

const getExamples = (examplesCount) => {
  const url = `http://localhost:8080/math/examples?count=${examplesCount}`;
  return fetch(url);
};

const fetchExamples = ({ examplesCount }) => (dispatch) => {
  dispatch(requestExamples());
  return getExamples(examplesCount)
    .then(response => response.json())
    .then(examples => dispatch(receiveExamples(examples)))
    .catch(() => dispatch(errorReceiveExamples()));
};

export default { fetchExamples };