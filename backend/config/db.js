import mongoose from 'mongoose'

//connect database
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			dbName: 'my-database',
		})
		console.log(`Db Connected ${conn.connection.host}`)
	} catch (error) {
		console.error(`Error : ${error.message}`)
		process.exit(1)
	}
}

export default connectDB
