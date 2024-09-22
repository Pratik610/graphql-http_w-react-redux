import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreatePostScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const CREATE_POST = gql`
    mutation CreatePost($title: String!, $description: String!) {
      createPost(title: $title, description: $description) {
        _id
      }
    }
  `;

  const [CreatePost] = useMutation(CREATE_POST);

  const createPostHandler = async (e) => {
    e.preventDefault();
    const { data, error } = await CreatePost({
      variables: { title, description },
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
        <h3 className="text-center">Create Post</h3>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostScreen;
