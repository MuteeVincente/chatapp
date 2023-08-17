const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();

app.use(cors()); // Use cors middleware

app.get('/', (req, res) => {
  res.send('We will get there');
});

app.listen(3002, () => {
  console.log('Server is listening on port 3002');
});
