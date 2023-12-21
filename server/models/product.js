const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    company: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    description:{
        type: String,
        require: true,
    },
    image_url:{
      type: Array,

    }
  });
  
  module.exports = mongoose.model('Product', userSchema);