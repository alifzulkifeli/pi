//require packages fron npm
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const mercari = require("./routes/mercari");
const translate = require("./routes/translate");
const rakuten = require("./routes/rakuten")

const app = express();
require('dotenv').config();


app.use(morgan('dev'));
app.use(cors());


//routes middleware

app.use("/pi", mercari);
// app.use("/pi", translate);
// app.use("/pi", rakuten);

app.use("/", (req, res) =>{
  res.json(process.env.PRICE) 
});


app.listen(8008, () => {
  console.log(`✔️ Server is running on port 8008`);
});