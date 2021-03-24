const express = require("express");
const router = express.Router();
const fake_db = require('../utilities/db');
const { v4: uuidv4 } = require("uuid");

let msg = {
  login_err: "Invalid username or password. Try signup",
  login_success: "Welcome to the Cookie Club",
  not_login: "You're not logged. Please login!",
};

router.get("/", (req, res) => {
  res.render("pages/home");
});

//this is the protected route
router.get("/supercoolmembersonlypage", (req, res) => {

  let id = req.cookies.SID;  
  let session = fake_db.sessions[id];

  
  if (session) {
    res.render("pages/members");
  } else {
    res.render("pages/err", msg);
  }

});

//if something went wrong, you get sent here
router.get("/error", (req, res) => {
  res.render("pages/error");
});

// 404 handling
// router.get("*", (req, res) => {
//   res.render("pages/error");
// });

//logout
router.get('/logout',(req,res)=>{
  let id = req.cookies.SID;
  
  //delete session id
  delete fake_db.sessions.SID;
  //creates the cookie that holds the UUID (the session ID)
  res.cookie("SID", id, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  
  res.render("pages/home");
});

module.exports = router;

