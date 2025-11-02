import mongoose from "mongoose"

const ideaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    title: {
        type: String,
        require: true,
        trim: true
    },
    summery: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

const Idea = mongoose.model('Idea', ideaSchema)

export default Idea