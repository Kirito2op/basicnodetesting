const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath;

  switch (req.url) {
    case '/':
      filePath = path.join(__dirname, 'index.html');
      break;
    case '/about':
      filePath = path.join(__dirname, 'about.html');
      break;
    case '/contact-me':
      filePath = path.join(__dirname, 'contact-me.html');
      break;
    default:
      filePath = path.join(__dirname, '404.html');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });
});

const port = 8080;
server.listen(port, () => {
  console.log('im alive');
});