var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var productSchema=new Schema({
  title:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:String
  }
});

module.exports=mongoose.model('Product',productSchema);
