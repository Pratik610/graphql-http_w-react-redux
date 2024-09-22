import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// generate token when login
const generateToken = (id) => {
	return jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	})
}

// auth for private queries
const authenticateJWT = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (authHeader) {
		try {
			const token = authHeader.split(' ')[1]
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = await User.findById(decoded.id)
			next()
		} catch (error) {

			res.status(500).send(error)
			

		}

	} else {
		next() // Proceed without user if no token is provided
	}
}

export { generateToken, authenticateJWT }
