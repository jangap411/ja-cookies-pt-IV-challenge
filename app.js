const express = require('express');
const cookieParser  = require('cookie-parser');
// const {v4:uuidv4} = require('uuid');
// const matchCredentials = require('./utils');
const postRoutes = require('./routes/post');
const getRoutes = require("./routes/get");
const fake_db = require('./utilities/db');
const app = express();
const port = 1612;

app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

//static resource
app.use(express.static('./'))

//db
// app.use(fake_db);

//routes
app.use(postRoutes);
app.use(getRoutes);



//listening port
app.listen(port, () => {
  console.log(`Server kicking http://localhost:${port}`)
});