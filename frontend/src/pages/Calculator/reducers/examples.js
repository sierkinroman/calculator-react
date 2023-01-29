import { ERROR_RECEIVE_EXAMPLES, RECEIVE_EXAMPLES, REQUEST_EXAMPLES } from "../constants/actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  examples: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EXAMPLES: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case RECEIVE_EXAMPLES: {
      const { examples } = action;
      return {
        ...state,
        isLoading: false,
        examples,
      };
    }
    case ERROR_RECEIVE_EXAMPLES: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    default: return state;
  }
};
