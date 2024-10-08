const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
   
     user:{
        type : Schema.Types.ObjectId,
        ref: 'user'
     },
     text : { 
         type: String,
         required: true
     },
     image : { 
         type: String,
         required: true
     },
     movie_id :{
        type: Number,
        required: true
     },
      shows : { 
         type: String,
         required: true
     },
     name: { 
         type: String,
         
     },
     avatar:{
          type:String,
     },
     likes:[
         {
          user:{
            type: Schema.Types.ObjectId,
            ref : 'user'
          },
         
        }
     ],
     comments:[
         {
            user:{
                type: Schema.Types.ObjectId,
                ref : 'user'
            },
              text : { 
                type: String,
                required: true
            },
            name: { 
                type: String,
                
            },
            avatar:{
                 type:String,
            },
             date: {
                type: Date,
                default: Date.now,
            },
         }
     ],
 date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = post = mongoose.model('Post', postSchema);