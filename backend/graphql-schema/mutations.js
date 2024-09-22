import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import UserType from "./userType.js";
import AuthPayloadType from "./authType.js";
import User from "../models/userModel.js";
import { generateToken } from "../config/auth.js";
import Post from "../models/postModel.js";
import PostType from "./postType.js";

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    singUp: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parentValue, { name, email, password }) {
        const checkUser = await User.find({ email });
        if (checkUser.length > 0) {
          throw new Error("User Already Exists");
        }
        const user = new User({
          name,
          email,
          password,
        });
        await user.save();
        return user;
      },
    },
    login: {
      type: AuthPayloadType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parentValue, { email, password }) {
        const user = await User.find({ email, password });
        if (!user) {
          throw new Error("Invalid Email or Password");
        }
        const token = generateToken(user[0]._id);
        return { token };
      },
    },
    createPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(parentValue, { title, description }, context) {
        if (!context.user) {
          throw new Error("Authentication required");
        }

        const post = new Post({
          title,
          description,
          author: context.user._id,
        });
        await post.save();
        return post;
      },
    },

    editPost: {
      type: PostType,
      args: {
        postId: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(parentValue, { postId, title, description }, context) {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        const post = await Post.findById(postId);

        if (String(post.author) !== String(context.user._id)) {
          throw new Error("You Are not the Owner of this Post");
        }

        post.title = title || post.title;
        post.description = description || post.description;
        await post.save();
        return post;
      },
    },

    deletePost: {
      type: PostType,
      args: {
        postId: { type: GraphQLID },
      },
      async resolve(parentValue, { postId }, context) {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        return await Post.deleteOne({ _id: postId, author: context.user._id });
      },
    },
  },
});
export default mutations;
