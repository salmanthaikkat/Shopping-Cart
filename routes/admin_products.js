var express=require('express');
var router=express.Router();
var mkdirp=require('mkdirp');
var fs=require('fs-extra');
var resizeImg=require('resize-img');

var Product = require('../models/product');
var Category = require('../models/categories');

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

router.get('/add-product',(req,res)=>{
  var title="",desc="",price="";
  Category.find((err,categories)=>{
    res.render('admin/add_product',{
      title:title,desc:desc,price:price,categories:categories
    });
  });
});

router.post('/add-product',(req,res)=>{
  var title=req.body.title;
  var desc=req.body.desc;
  var category=req.body.category;
  var price=req.body.price;
  var price2=parseFloat(price).toFixed(2);
  var imageName=req.files.image.name;

  Product.find({title:title},(err,product)=>{
    if(product==undefined){
      console.log(product);
      res.send("Product Exists");
    }
    else{
      var product=new Product({
        title:title,
        desc:desc,
        price:price2,
        image:imageName,
        category:category
      });
      product.save((err)=>{
        if(err){
          res.send(err);
        }
        else{
          mkdirp('public/product_images/'+product._id,function(err){
            console.log(err);
          });
          mkdirp('public/product_images/'+product._id+'/gallery',function(err){
            console.log(err);
          });
          mkdirp('public/product_images/'+product._id+'/gallery/thumbs',function(err){
            console.log(err);
          });

          var productImage=req.files.image;
          var path='public/product_images/'+product._id+'/'+imageName;

          productImage.mv(path,(err)=>{
            if(err){
              res.send(err);
            }
            else{
              res.redirect('/admin/products');
            }
          });

        }
      });
    }
  });

});

module.exports=router;
