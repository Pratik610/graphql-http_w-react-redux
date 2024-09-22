import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { allPostsReducer } from "./reducers/postReducers";
import { userLoginReducer, userDetailsReducer } from "./reducers/userReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  allPosts: allPostsReducer,
});

const userAuthFromStorage = localStorage.getItem("graphqlLoginToken")
  ? localStorage.getItem("graphqlLoginToken")
  : "";

const initialState = {
  userLogin: {
    token: userAuthFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
