const io = require("socket.io-client");

const connect = async () => {
  const socket = io("http://localhost:3005");
  console.log("RUN connect");
  socket.on("connect", () => {
    console.log("connect");
  });
};

export default connect;
