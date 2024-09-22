import { GraphQLObjectType, GraphQLString } from 'graphql'
import UserType from './userType.js'

// Auth Schema to send token to the user when logged in
const AuthPayloadType = new GraphQLObjectType({
	name: 'AuthPayload',
	fields: {
		token: { type: GraphQLString },
	},
})

export default AuthPayloadType
