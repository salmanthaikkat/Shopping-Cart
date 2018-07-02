var express = require('express');
var Page=require('../models/page');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  Page.find().sort({sorting:1}).exec((err,pages)=>{
    if(err){
      throw err;
    }
    else{
      res.render('admin/pages',{
        pages:pages
      });
    }
  });
});

router.get('/add-page',function(req,res){
  var title="",slug="",content="";
  res.render('admin/add_page',{
    title:title,
    slug:slug,
    content:content
  });
});

router.post('/add-page',(req,res)=>{
  var title=req.body.title;
  var slug=req.body.slug;
  var content=req.body.content;
  var page=new Page({
    title:title,
    slug:slug,
    content:content,
    sorting:0
  });
  page.save((err)=>{
    if(err) throw err;
    res.redirect('/admin/pages');
  });
});

router.get('/edit-page/:id',(req,res)=>{
  var id = req.params.id;
  Page.findOne({_id:id},(err,page)=>{
    if(err){
      res.send("Page Error");
    }
    else{
      var title=page.title;
      var slug=page.slug;
      var content=page.content;
      res.render('admin/edit_page',{
        title:title,slug:slug,content:content,id:id
      });
    }
  })
});

router.post('/edit-page/:id',(req,res)=>{
  var id=req.params.id;
  Page.findOne({_id:id},(err,page)=>{
    if(err){
      res.send("Page Error");
    }
    else{
      page.title=req.body.title;
      page.slug=req.body.slug;
      page.content=req.body.content;
      page.save((err)=>{
        if(err){
          res.send("Edit Error");
        }
        else{
          res.redirect('/admin/pages');
        }
      })
    }
  })
});

router.get('/delete-page/:id',(req,res)=>{
  var id=req.params.id;
  Page.findOne({_id:id},(err,page)=>{
    if(err){
      res.send("Page error");
    }
    else{
      var title=page.title;
      res.render('admin/delete_page',{title:title,id:id});
    }
  });
});

router.post('/delete-page/:id',(req,res)=>{
  var id=req.params.id;
  Page.findByIdAndRemove(id,(err)=>{
    if(err){
      res.send("Page Error");
    }
    else{
      res.redirect('/admin/pages');
    }
  })
})


module.exports = router;
