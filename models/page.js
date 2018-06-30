var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var PageSchema=new Schema({
  title:{
    type:String,
    required:true
  },
  slug:{
    type:String
  },
  content:{
    type:String,
    required:true
  },
  sorting:{
    type:Number
  }
});

module.exports=mongoose.model('Page',PageSchema);
