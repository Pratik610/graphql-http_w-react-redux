import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  useQuery,
  gql,
  useMutation,
  useLazyQuery,
  useApolloClient,
} from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const EditPostScreen = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const GET_POST_BY_ID = gql`
    query GetPost($id: ID) {
      post(id: $id) {
        _id
        title
        description
      }
    }
  `;

  const EDIT_POST = gql`
    mutation EditPost($postId: ID, $title: String, $description: String) {
      editPost(postId: $postId, title: $title, description: $description) {
        title
        description
      }
    }
  `;

  const { data: postData } = useQuery(GET_POST_BY_ID, {
    variables: {
      id: id,
    },
  });

  const [EditPost] = useMutation(EDIT_POST);

  useEffect(() => {
    if (postData) {
      setTitle(postData.post.title);
      setDescription(postData.post.description);
    }
  }, [postData]);

  const createPostHandler = async (e) => {
    e.preventDefault();
    const { data, error } = await EditPost({
      variables: { postId: postData.post._id, title, description },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem("graphqlLoginToken")}`,
        },
      },
    });

    setTitle("");
    setDescription("");
    navigate("/");

    if (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container   w-100 mt-4"
      style={{ height: window.innerHeight }}
    >
      <Navbar />
      <div className="mt-5 col-6 d-block border p-3 rounded-3 mx-auto">
        <h3 className="text-center">Edit Post</h3>
        <form className="mt-4" onSubmit={createPostHandler}>
          <div class="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=""
            />
            <label forHtml="formId1">Title</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder=""
            />
            <label forHtml="formId1">Description</label>
          </div>
          <div>
            <button type="submit" className="btn btn-primary d-block w-100">
            Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostScreen;
