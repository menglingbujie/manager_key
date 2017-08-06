var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user){
    return res.redirect("/user");
  }
  return res.render('index',{userinfo:JSON.stringify(req.session.user)});
});

module.exports = router;
