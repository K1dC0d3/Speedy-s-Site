const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/:page', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', `pages/${req.params.page}.html`))
});

app.listen(6700, () => {
  console.log('Server running on port 6700');
});