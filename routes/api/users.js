var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var urldb = "mongodb://localhost:27017/adminusers";
var _ = require('lodash');
// 找回密码
router.post('/reset-password', function(req,res,next){
  console.log("==reset password==");
})
// 登录
router.post('/login', function(req,res,next){
  let cellphone = req.body.cellphone||"";
  MongoClient.connect(urldb,function(err,db){
    const coll = db.collection(cellphone);
    coll.find({cellphone:cellphone}).toArray(function(err,docs){
      let resp = {ret:0,data:[],msg:""};
      if(err){
        resp.msg="["+err.name+"]"+err.message;
      }else if(!docs||docs.length<=0){
        resp.msg="您不是登记用户，请先注册";
      }else{
        resp.ret = 1;
        resp.data = docs[0];
        resp.msg = "";

        req.session.user = resp.data;
      }
      db.close();
      return res.json(resp);
    });
  });
});
// 更新用户
router.post('/update-user',function(req,res,next){

})
// 删除用户
router.post('/delete-user', function(req, res, next){

})
router.post('/logout', function(req,res,next){
  if(req.session.user){
    req.session.user = null;
  }
  res.json({ret:1,msg:""});
})
//创建用户
router.post('/register',function(req, res, next){
  _.assign(req.body,{create_date:(new Date()).getTime(),modify_date:(new Date()).getTime()})
  console.log(req.body);
  let cellphone = req.body.cellphone||"";
  MongoClient.connect(urldb,function(err,db){
    const coll = db.collection("user"+cellphone);// 每个用户都对应一个自己的cellphone数据表
    coll.find({cellphone:cellphone}).toArray(function(err,docs){
      let resp = {ret:0,data:[],msg:""};
      if(err){
        resp.msg="["+err.name+"]"+err.message;
        return res.json(resp);
      }else if(!docs||docs.length<=0){
        coll.insertMany([req.body],function(err,docs){
          if(err||docs.result.ok!=1){
            resp.msg="["+err.name+"]"+err.message;
          }else{
            resp.ret = 1;
            resp.data = docs.ops[0];
            resp.msg = "";

            req.session.user = resp.data;// 存储注册后用户信息
          }
          db.close();
          return res.json(resp);
        });
      }else{
        db.close();
        resp.ret=0;
        resp.msg="该用户已存在，请登陆！";
        return res.json(resp);
      }
    })
  });
});
module.exports = router;
