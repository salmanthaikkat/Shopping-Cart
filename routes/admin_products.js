var express=require('express');
var router=express.Router();
var mkdirp=require('mkdirp');
var fs=require('fs-extra');
var resizeImg=require('resize-img');

var Product = require('../models/product');
var Category = require('../models/product');

router.get('/',(req,res)=>{
  var count;

  Product.count((err,c)=>{
    count=c;
  });

  Product.find((err,products)=>{
    res.render('admin/products',{
      products:products,count:count
    });
  });

});

module.exports=router;
