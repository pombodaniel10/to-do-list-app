require('dotenv').config();

const app = require('./config/express');
require('./config/mongo');

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(process.env.PORT, () => {
    console.info(`server started on port ${process.env.PORT} (${process.env.NODE_ENV})`);
  });
}