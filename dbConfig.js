const mongoose = require('mongoose');

mongoose.connect(process.env.URL, {})
  .then(() => {
    console.log('Database connection successfully established');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error.message);
    process.exit(1)
  })
  