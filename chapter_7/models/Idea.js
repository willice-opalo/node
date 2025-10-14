import mongoose from "mongoose"

const ideaSchema = new mongoose.Schema({
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