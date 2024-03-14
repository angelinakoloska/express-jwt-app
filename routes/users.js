var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) {
    res.status(200).json({success:false, message: "Error! Token was not provided."});
  }
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const users = await userService.getAll();
  res.status(200).json({
    success:true,
    data:{
      userId:decodedToken.userId,
      email:decodedToken.email,
      users: users.map(user=>user.Email)
    }
  });
});

module.exports = router;