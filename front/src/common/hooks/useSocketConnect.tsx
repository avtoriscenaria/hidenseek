const io = require("socket.io-client");

const socket = io("http://localhost:3005");

export default socket;
