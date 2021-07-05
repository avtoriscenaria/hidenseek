const io = require("socket.io-client");
const { HOST } = require("constants/api");

const socket = io(HOST);

export default socket;
