const mongoose = require('mongoose');

const UsercodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  githubUrl: {
    type: String,
    required: true,
  },
  deployedUrl: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  author_ID:{
    type: String,
    required: true,
  },
  sourcePath:{
    type: String,
    required: true,
  },
  code: {
    html: {
      type: String,
      // required: true,
    },
    css: {
      type: String,
      // required: true,
    },
    js: {
      type: String,
      // required: true,
    },
  },
  // codeType:{
  //   type: String,
  //   required: true,
  // }
});

const UserCode = mongoose.model('usercodes', UsercodeSchema);

module.exports = UserCode;

