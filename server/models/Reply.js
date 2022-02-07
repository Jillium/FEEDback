const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Reply = new Schema({
    replyText: {
        type: String
    },
    RepliedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    Comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
});

const Reply = model('Reply', ReplySchema);

module.exports = Reply;