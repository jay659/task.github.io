 const mongoose = require('mongoose');

 const userSchema=new mongoose.Schema(
     {
         userName:{
             type:String,
             required:true
         },
         eMail:{
            type:String,
            required:true,
            index:{
                unique:true
            },
        },
        password:{
            type:String,
            required:true
        },
        aboutYou:{
            type:String,
            required:true
        },
        Date:{
            type:Date,
            default:Date.now
        }

    }
 );

 module.exports=mongoose.model('sigups',userSchema);
