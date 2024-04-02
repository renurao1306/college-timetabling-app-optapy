const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

// Day.js is an alternative to moment which is no longer maintained
// const moment = require('moment');
const dayjs = require('dayjs');
const { exec } = require('child_process');

const settings = require('./settings');
const { setupRoutes } = require('./routes');




const port = settings.serverSettings.port;


var app = express();
let server = http.createServer(app, { allowEIO3: true });
let io = socketIO(server);

app.use(cors());
app.use(express.urlencoded());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


//Socket connection
//* All SOCKET RELATED METHODS

io.on('connection', (socket) => {
  console.log("A new user has connected");
});

console.log("Emitting...");
io.emit("plan_run_status_update", "Test message");

// Setup API (Express) routes
setupRoutes(app, bodyParser, io);

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
