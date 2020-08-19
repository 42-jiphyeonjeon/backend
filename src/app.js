const express = require('express');
const models = require('./models');
const app = express();
const port = 3000;

models.sequelize.sync().then( () => {
	console.log("DB connection success");
  }).catch(err => {
	console.log("DB connection fail");
	console.log(err);
});

app.use(express.json())

app.listen(port, () => {
  console.log(`api server listening at http://localhost:${port}`);
});