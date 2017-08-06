var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect("/user/login");
});

router.get("/login",function(req,res,next){
  res.render("user/login");
});
router.get("/register",function(req,res,next){
  res.render("user/register");
});
router.get("/forget_password",function(req,res,next){
  res.render("user/forget_password");
});

module.exports = router;
