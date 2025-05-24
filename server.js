const express = require('express');
const app = express();
const initRoutes = require('./routes/web');

app.use(express.urlencoded({extended: true}));
initRoutes(app);

const port = 5001;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
