var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var urldb = "mongodb://localhost:27017/keys_{DB_NAME}";

// 获取未归还钥匙列表
router.get('/get-keys-unback', function(req, res, next) {
  MongoClient.connect(urldb.replace(/{DB_NAME}/,req.session.user.cellphone),function(err,db){
     const coll = db.collection("keys-unback");
     coll.find({}).toArray(function(err,docs){
        let resp = {ret:0,data:[],msg:""};
        if(err){
          resp.msg="["+err.name+"]"+err.message;
        }else if(!docs||docs.length<=0){
          resp.msg="No data";
        }else{
          resp.ret = 1;
          resp.data = docs;
          resp.msg = "";
        }
        db.close();
        return res.json(resp);
     });
  });
});

// 获取归还的钥匙列表
router.get('/get-keys-backed', function(req, res, next) {
  var ret = {
    ret:1,
    msg:"我是已还钥匙列表"
  }
  return res.json(ret);
});

// 确定归还钥匙
router.post('/key-back', function(req, res, next) {
  var ret = {
    ret:1,
    msg:"我要还钥匙"
  }
  return res.json(ret);
});

//创建借钥匙订单
router.post('/create-key',function(req, res, next){
  MongoClient.connect(urldb.replace(/{DB_NAME}/,req.session.user.cellphone),function(err,db){
    const coll = db.collection("keys-unback");
    _.assing(req.body,{create_date:(new Date()).getTime(),back_date:(new Date()).getTime()});
    coll.insertMany([req.body],function(err,result){
      let resp = {
        ret:0,
        msg:"",
      }
      if(err){
        resp.ret = 0;
        resp.msg  = "["+err.name+"]"+err.message;
      }else{
        resp.ret = 1;
        resp.msg="";
      }
      db.close();
      return res.json(resp);
    })
  })

});
module.exports = router;
