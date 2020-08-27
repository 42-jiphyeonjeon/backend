const express = require('express');
const models = require('./models');
const errorHandler = require('./exceptions/error_handler');

const checkOutRouter = require('./routes/check_out');

const app = express();
const port = 3000;

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
app.use('/checkout', checkOutRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`api server listening at http://localhost:${port}`);
});
