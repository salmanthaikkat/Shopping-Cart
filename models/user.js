var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:boolean,
        default:false
    }
});

module.exports=mongoose.model('User',UserSchema);