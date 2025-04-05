import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("write", (formContent) => {
    io.emit("update", formContent);
  });
  console.log(socket.id);
});

httpServer.listen(3100, () => {
  console.log("Web socket running at port 3100!");
});
