const express = require('express');
const home = require('./src/routes/home.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Request-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
      return res.status(200).json({});
  }
  next();
});

app.use('/home',home);

app.use(
  express.urlencoded({
      extended: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});