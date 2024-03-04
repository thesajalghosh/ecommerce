import { useEffect } from "react";
import io from "socket.io-client";

var socket;
var isSocketConnected = false;
const useSocket = (userId) => {
  useEffect(() => {
    socket = io.connect(process.env.REACT_APP_API, {
      transports: ["websocket"],
    });
    isSocketConnected = true;
    if (isSocketConnected) {
      socket.on("connected", () => {
        console.log("Socket connected with" + process.env.REACT_APP_API);
      });

      socket.emit("setup", userId);
    }
  }, [socket, isSocketConnected]);
};

export { useSocket, socket, isSocketConnected };
