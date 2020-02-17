const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = Schema({
    id: {
        type: String
    },
    content: {
        type: String,
        max: 140,
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
})

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    joinDate: {
        type: Date,    
        Default: Date.now
    },
    aboutUser: {
        type: String,
        max:, 500
    },
    thoughtsArray: [thoughtSchema]
})