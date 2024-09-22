export const allPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_POST_REQUEST":
      return { loading: true };
    case "GET_ALL_POST_SUCCESS":
      return { loading: false, posts: action.payload };
    case "GET_ALL_POST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
