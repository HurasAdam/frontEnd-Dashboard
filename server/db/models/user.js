const mongoose= require('mongoose');

const Schema= mongoose.Schema
const userSchema = new Schema({

    email:{
        type:String,
        require:true,
        uniqure:true
    },
    password:{
        type:String,
        required:true
    }
})

const model = mongoose.model('User',userSchema)
module.exports=model