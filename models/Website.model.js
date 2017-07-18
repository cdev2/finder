const mongoose = require('mongoose');
const searchPlugin = require('mongoose-search-plugin');
const Schema = mongoose.Schema;

const WebsiteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  submittedBy: {
    id: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

WebsiteSchema.plugin(searchPlugin, {
  fields: ['title', 'url', 'description']
})

module.exports = mongoose.model('Website', WebsiteSchema);