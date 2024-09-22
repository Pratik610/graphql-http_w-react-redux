import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { checkUserLogin } from "../actions/userActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, gql, useMutation } from "@apollo/client";

const LoginScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { token } = useSelector((state) => state.userLogin);

  const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  const [login] = useMutation(LOGIN);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "USER_LOGIN_REQUEST" });

      const { data } = await login({
        variables: { email, password },
      });

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data.login.token,
      });

      localStorage.setItem("graphqlLoginToken", data.login.token);
      navigate("/");
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  return (
    <div
      className="container justify-content-center align-items-center w-100 d-flex"
      style={{ height: window.innerHeight }}
    >
      <div className="col-6 p-3 mb-5 border rounded-3 ">
        <h3>Login</h3>
        <form onSubmit={loginHandler} className="mt-4">
          <div class="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
            <label forHtml="formId1">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="pass"
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=""
            />
            <label forHtml="formId1">Password</label>
          </div>
          <div>
            <button type="submit" className="btn btn-primary d-block w-100">
              Login
            </button>
          </div>

          <Link to={"/sign-up"} className="text-center d-block mt-4 ">
            Sign-up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
