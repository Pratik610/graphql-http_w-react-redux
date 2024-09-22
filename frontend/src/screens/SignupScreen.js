import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

const SignupScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SIGNUP = gql`
    mutation SingUp($name: String, $email: String, $password: String) {
      singUp(name: $name, email: $email, password: $password) {
        _id
      }
    }
  `;

  const [singUp] = useMutation(SIGNUP);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await singUp({
        variables: { name, email, password },
      });

      window.alert("SignUp successful");
      navigate("/login");
    } catch (error) {
      window.alert("Sign up Failed");
    }
  };

  return (
    <div
      className="container justify-content-center align-items-center w-100 d-flex"
      style={{ height: window.innerHeight }}
    >
      <div className="col-6 p-3 mb-5 border rounded-3 ">
        <h3>SignUp</h3>
        <form onSubmit={loginHandler} className="mt-4">
          <div class="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
            />
            <label forHtml="formId0">Name</label>
          </div>
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
            <label forHtml="formId2">Password</label>
          </div>
          <div>
            <button type="submit" className="btn btn-primary d-block w-100">
              SignUp
            </button>
          </div>

          <Link to={"/login"} className="text-center d-block mt-4 ">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupScreen;
