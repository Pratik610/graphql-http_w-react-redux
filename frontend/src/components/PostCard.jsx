import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, gql, useMutation, useApolloClient } from "@apollo/client";
import { Link } from "react-router-dom";
const PostCard = ({ id, title, description, author, createdAt }) => {
  const userInfo = useSelector((state) => state.userDetails);
  const allPosts = useSelector((state) => state.allPosts);
  const dispatch = useDispatch();
  const client = useApolloClient();
  const DELETE_POST = gql`
    mutation DeletePost($postId: ID) {
      deletePost(postId: $postId) {
        _id
      }
    }
  `;

  const GET_POSTS = gql`
    query {
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
  const [deletePost] = useMutation(DELETE_POST);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p class="card-text">{description}</p>
        Author: {author.name}
        <hr />
        {userInfo?.user?._id === author?._id && (
          <>
            <Link class="btn btn-primary me-2" to={`/post/${id}`}>
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={async () => {
                const { data, error } = await deletePost({
                  variables: { postId: id },
                  context: {
                    headers: {
                      authorization: `Bearer ${localStorage.getItem(
                        "graphqlLoginToken"
                      )}`,
                    },
                  },
                });

                if (error) {
                  return;
                }

                const mydata = await client.refetchQueries({
                  include: [GET_POSTS],
                });
                dispatch({
                  type: "GET_ALL_POST_SUCCESS",
                  payload: mydata[0]?.data?.posts,
                });
              }}
            >
              Delete
            </button>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
