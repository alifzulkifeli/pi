//require packages fron npm
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const cors = require('cors')



const mercari = require("./routes/mercari");


const app = express();


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(cookieParser());
// app.use(expressValidator());
app.use(cors());


//routes middleware

app.use("/pi", mercari);



app.listen(8008, () => {
  console.log(`✔️ Server is running on port 8008`);
});