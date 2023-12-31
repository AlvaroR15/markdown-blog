const mongoose = require('mongoose');
const { marked } = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

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
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

articleSquema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower:true, strict:true})
    };

    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next();
});

articleSquema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if(update.markdown) {
        update.sanitizedHtml = dompurify.sanitize(marked(update.markdown));
    };
    next();
})

module.exports = mongoose.model('Article', articleSquema)