const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    subreddit: String,
    title: String,
    score: Number,
    thumbnail: String,
    url: String,
    selftext: String,
    permalink: String,
    author: String,
    created: Number,
});

module.exports = mongoose.model('Topic', topicSchema);