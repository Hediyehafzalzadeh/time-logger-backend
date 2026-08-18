import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false
    },
     timeEntries: [{
        type :  Number,
        required: true
    }],
    startTime: {
        type: Date,
        default: null
    },
    endTime: {
        type: Date,
        default: null
    }

})

const Task = mongoose.model('Task', taskSchema);

export default Task;