const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
const userRoutes = require('./routes/users');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json()); 

app.use('/api/users', userRoutes); 


mongoose.connect('mongodb+srv://fujas:250403@cluster0.kbv8sof.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});


app.get('/', (req, res) => {
  res.send('Server is running');
});
 
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
