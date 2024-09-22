import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazyQuery,
  gql,
  useMutation,
  useApolloClient,
} from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const userInfo = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const client = useApolloClient();

  const { token } = useSelector((state) => state.userLogin);
  const USER_DETAILS = gql`
    query {
      userDetails {
        _id
        name
      }
    }
  `;

  const [userDetails] = useLazyQuery(USER_DETAILS, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("graphqlLoginToken")}`,
      },
    },
  });

  useEffect(() => {
    const getDetails = async () => {
      if (!token) {
        navigate("/login");
      } else {
        dispatch({
          type: "USER_DETAILS_REQUEST",
        });

        const { data, error } = await userDetails();

        if (error) {
          dispatch({
            type: "USER_DETAILS_FAIL",
            payload: error,
          });
          navigate("/login");
          return;
        }

        dispatch({
          type: "USER_DETAILS_SUCCESS",
          payload: data.userDetails,
        });
      }
    };

    getDetails();
  }, [token]);

  return (
    <div className="bg-primary justify-content-between align-items-center d-flex rounded-3 p-3">
      <h3 className="text-light">
        <Link to={"/"} className="text-decoration-none text-light">
          Hi, {userInfo?.user?.name}
        </Link>{" "}
      </h3>
      <div>
        <Link to={"/create"} className="btn me-4 btn-success">
          Create A Post
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("graphqlLoginToken");
            dispatch({
              type: "USER_LOGOUT",
            });
            dispatch({
              type: "USER_DETAILS_RESET",
            });
            client.clearStore();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
