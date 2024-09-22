export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, token: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "USER_DETAILS_RESET":
      return {};
    default:
      return state;
  }
};
