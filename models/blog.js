const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//const mongooseAlgolia = require("mongoose-algolia");
const BlogSchema = new Schema({

  from: String,
  to: String,
  subject: String,
  text: String,
  schedule: {
    second: String,
    minute: String,
    hour: String,
    month:String,
    day: String,
    week:String

  },



  time: {
    type: Date,
    default: Date.now
  },

}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;