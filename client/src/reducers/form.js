import { SUBMIT_FORM } from "../actions/types";

const initialState = {
  lastUser: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBMIT_FORM:
      return {
        ...state,
        lastUser: payload
      };
    default:
      return state;
  }
}
