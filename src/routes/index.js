const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();
const indexJs = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== indexJs) && (file.slice(-3) === '.js'))
  .forEach((routeFile) => {
    const routeName = `/${routeFile.split('.')[0]}`;
    const route = require(`./${routeFile}`);
    console.log(routeName);
    console.log(route);
    router.use(routeName, route);
  });

module.exports = router;
