//require packages fron npm
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const mercari = require("./routes/mercari");
const rakuten = require("./routes/rakuten");
const amazon = require("./routes/amazon");

const app = express();
require('dotenv').config();


app.use(morgan('dev'));
app.use(cors());


//routes middleware

app.use("/scrap", mercari);
app.use("/scrap", rakuten);

app.use("/", (req, res) =>{
  res.json(process.env.PRICE) 
});


app.listen(8008, () => {
  console.log(`✔️ Server is running on port 8008`);
});