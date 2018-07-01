var express = require('express');
const { check, validationResult } = require('express-validator/check');
var Category=require('../models/categories');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  Category.find().exec((err,categories)=>{
    if(err){
      throw err;
    }
    else{
      res.render('admin/categories',{
        categories:categories
      });
    }
  });
});

router.get('/add-category',function(req,res){
  var title="";
  res.render('admin/add_categories',{
    title:title
  });
});

router.post('/add-category',(req,res)=>{
  var title=req.body.title;
  var category=new Category({
    title:title
  });
  category.save((err)=>{
    if(err) throw err;
    res.redirect('/admin/categories');
  });
});

router.get('/edit-category/:id',(req,res)=>{
  var id = req.params.id;
  Category.findOne({_id:id},(err,category)=>{
    if(err){
      res.send("Page Error");
    }
    else{
      var title=category.title;
      res.render('admin/edit_categories',{
        title:title,id:id
      });
    }
  })
});

router.post('/edit-category/:id',(req,res)=>{
  var id=req.params.id;
  Category.findOne({_id:id},(err,category)=>{
    if(err){
      res.send("Page Error");
    }
    else{
      category.title=req.body.title;
      category.save((err)=>{
        if(err){
          res.send("Edit Error");
        }
        else{
          res.redirect('/admin/categories');
        }
      })
    }
  })
});

router.get('/delete-category/:id',(req,res)=>{
  var id=req.params.id;
  Category.findOne({_id:id},(err,category)=>{
    if(err){
      res.send("Page error");
    }
    else{
      var title=category.title;
      res.render('admin/delete_categories',{title:title,id:id});
    }
  });
});

router.post('/delete-category/:id',(req,res)=>{
  var id=req.params.id;
  Category.findByIdAndRemove(id,(err)=>{
    if(err){
      res.send("Page Error");
    }
    else{
      res.redirect('/admin/categories');
    }
  })
})


module.exports = router;
