const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// require('mongoose-currency').loadType(mongoose);
// const Currency = mongoose.Types.Currency;

const jobSchema = new Schema(
  {
    
    jobtitle: {
      type: String,
      required: true,
    },
    employername:{
        type:String,
        required:true,
    },
    description: {
      type: String,
      required: true,
    },
    location:{
        type:String,
        required:true,
    }
    
  },
  {
    timestamps: true,
  }
);


const Job = mongoose.model('Job',jobSchema);
module.exports = Job;