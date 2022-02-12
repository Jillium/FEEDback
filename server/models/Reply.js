const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const replySchema = new Schema({
    ReplyText: {
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
},
{
    toJSON: {
      virtuals: true
    }
  });

const Reply = model('Reply', replySchema);

module.exports = Reply;