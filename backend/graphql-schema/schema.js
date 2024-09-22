import { GraphQLSchema } from 'graphql'

import RootQuery from './rootQuery.js'
import mutations from './mutations.js'
const Schema = new GraphQLSchema({
	query: RootQuery,
	mutation: mutations,
})

export default Schema
