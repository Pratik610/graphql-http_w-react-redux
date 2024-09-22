import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import UserType from "./userType.js";
import User from "../models/userModel.js";
const PostType = new GraphQLObjectType({
  name: "postType",
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },

    author: {
      type: UserType,
      async resolve(parentValue) {
        return await User.findById(parentValue.author);
      },
    },
    createdAt: { type: GraphQLString },
  },
});

export default PostType;
