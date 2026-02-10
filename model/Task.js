const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mogoose.model('Task', TaskSchema);
