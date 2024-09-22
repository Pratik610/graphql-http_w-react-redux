import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { checkUserLogin } from "../actions/userActions.js";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazyQuery,
  gql,
  useMutation,
  useApolloClient,
} from "@apollo/client";
import PostCard from "../components/PostCard.jsx";
import Navbar from "../components/Navbar.jsx";
const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const client = useApolloClient();
  const { token } = useSelector((state) => state.userLogin);
  const userInfo = useSelector((state) => state.userDetails);
  const allPosts = useSelector((state) => state.allPosts);

  const GET_POSTS = gql`
    query GetAllPosts {
      posts {
        _id
        author {
          _id
          name
        }
        title
        description
      }
    }
  `;

  const [GetAllPosts] = useLazyQuery(GET_POSTS, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("graphqlLoginToken")}`,
      },
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const getDetails = async () => {
      if (!token) {
        navigate("/login");
      } else {
        dispatch({
          type: "GET_ALL_POST_REQUEST",
        });
        const { data, error } = await GetAllPosts();

        if (error) {
          dispatch({
            type: "GET_ALL_POST_FAIL",
            payload: error,
          });
          navigate("/login");
          return;
        }

        dispatch({
          type: "GET_ALL_POST_SUCCESS",
          payload: data.posts,
        });
      }
    };

    getDetails();
  }, [token]);

  return (
    <div
      className="container   w-100 mt-4"
      style={{ height: window.innerHeight }}
    >
      <Navbar />

      <div className="row mt-4">
        {allPosts?.posts?.map((item) => (
          <div className="col-4 mt-2">
            <PostCard
              id={item._id}
              title={item.title}
              description={item.description}
              author={item.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
