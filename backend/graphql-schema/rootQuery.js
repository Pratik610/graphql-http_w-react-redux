import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from "graphql";
import User from "../models/userModel.js";
import UserType from "./userType.js";
import PostType from "./postType.js";
import Post from "../models/postModel.js";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    userDetails: {
      type: UserType,
      async resolve(parent, args, context) {
        if (!context.user) {
          throw new Error("Authentication required");
        }
        return context.user;
      },
    },

    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, { id }, context) {
        const data = await Post.findById(id);
        return data;
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      async resolve(parent, args, context) {
        const data = await Post.find({});
        return data;
      },
    },
  }),
});

export default RootQuery;
