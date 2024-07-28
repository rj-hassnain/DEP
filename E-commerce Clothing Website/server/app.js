const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();


connectDB();


app.use(express.json()); 
app.use(cors()); 


app.use('/api/products', productRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
