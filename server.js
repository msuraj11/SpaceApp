const express = require('express');
const methodOverride = require('method-override');
//const connectDB = require('./config/db');

const app = express();

// Connect to data-base
//connectDB();

//InitMiddleware for body parser to send/post request to the route
// Earlier to this, there used to be a package bodyParser,
// initialize and use it like : app.use(bodyParser.json({ extended: false }));
// but now included in express as below.
app.use(express.json({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes of uploading an image
app.use('/api/upload', require('./routes/upload'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
