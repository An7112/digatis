const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'data.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3333, () => {
  console.log('JSON Server is running on port 3333');
});