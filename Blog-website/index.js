const express = require('express');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');

const app = express();


connectDB();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/posts', postsRouter); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
