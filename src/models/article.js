const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify')

const articleSquema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

articleSquema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower:true, strict:true})
    };
    next();
})

module.exports = mongoose.model('Article', articleSquema)