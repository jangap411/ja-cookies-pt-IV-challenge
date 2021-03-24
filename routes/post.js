const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const matchCredentials = require("../utilities/utils");
const fake_db = require('../utilities/db');

let msg = {
  login_err:"Invalid username or password. Try signup",
  login_success:"Welcome to the Cookie Club",
  not_login:"You're not logged. Please login!"
}

//create a user account
router.post("/create", (req, res) => {
  let body = req.body;
  let user = {
    username: body.username,
    password: body.password,
  };

  fake_db.users[user.username] = user;
  res.redirect("/");
});

//login
router.post("/login", (req, res) => {
  if (matchCredentials(req.body)) {
    let user = fake_db.users[req.body.username];
    
    let data = {
      username:user
    }
    let id = uuidv4();

    fake_db.sessions[id] = {
      user: user,
      timeOfLogin: Date.now(),
    };

    //creates the cookie that holds the UUID (the session ID)
    res.cookie("SID", id, { 
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
 
    res.render("pages/members",data);
  } else {
    res.render("pages/error",msg);
  }
  
});


module.exports = router;
