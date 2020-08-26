const express = require('express');
const models = require('./models');
const errorHandler = require('./exceptions/error_handler');

const app = express();
const port = 3000;

const checkinRouter = require('./routes/checkin');

models.sequelize
  .sync()
  .then(() => {
    console.error('DB connection success');
  })
  .catch((err) => {
    console.log('DB connection fail');
    console.log(err);
  });

app.use(express.json());
app.use(errorHandler);

app.use('/checkin', checkinRouter);

app.listen(port, () => {
  console.log(`api server listening at http://localhost:${port}`);
});
