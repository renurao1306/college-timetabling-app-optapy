const { io } = require("socket.io-client");

// Below must be used for the ES6 type import statements
// But, for that to work in a Node JS application (not applicable for React / React Native
// apps), we need to mark the type as
// "module" in package.json. Include the below line in package.json of Node application
// Include this in package.json ----> "type": "module",

// import { io } from 'socket.io-client';

let socket = io('ws://localhost:3000');

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('plan_run_status_update', function(data) {
  console.log("Got data on websocket", data);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
