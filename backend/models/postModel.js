import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model('post', postSchema)

export default Post