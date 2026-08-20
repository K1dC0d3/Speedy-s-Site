const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.get('/:page', (req, res) => {
  const filePath = path.join(__dirname, 'public', `pages/${req.params.page}.html`);

  // Use a callback to catch missing file errors
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
  });
});

app.get('/books/:book', (req, res) => {
  const filePath = path.join(__dirname, 'public', `pages/books/${req.params.book}.html`);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
  });
});

// 404 Fallback Middleware (Must be placed AFTER all other routes)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(6700, () => {
  console.log('Server running on port 6700');
});