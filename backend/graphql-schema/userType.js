import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

const UserType = new GraphQLObjectType({
	name: 'userType',
	fields: {
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
	},
})

export default UserType
