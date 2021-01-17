import { SIGN_IN, SIGN_OUT } from '../actions/types';

// The capitalized syntax indicates that this object should not be modified under any circumstances, it is only used for state.
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };

    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

export default authReducer;
