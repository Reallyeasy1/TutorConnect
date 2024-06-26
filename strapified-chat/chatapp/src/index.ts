"use strict";
const axios = require("axios");
const socketIo = require("socket.io");

module.exports = {
/**

An asynchronous register function that runs before
your application is initialized.
This gives you an opportunity to extend code.
*/
register({ strapi }) {},
/**

An asynchronous bootstrap function that runs before
your application gets started.
This gives you an opportunity to set up your data model,
run jobs, or perform some special logic.
*/
bootstrap({ strapi }) {
const io = socketIo(strapi.server.httpServer, {
cors: {
origin: "http://localhost:3000",
methods: ["GET", "POST"],
allowedHeaders: ["my-custom-header"],
credentials: true,
},
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", async ({ username }) => {
    console.log("Username is", username);
    if (username) {
      socket.join("group");
      socket.emit("welcome", {
        user: "bot",
        text: `${username}, Welcome to the group chat`,
        userData: username,
      });

      let strapiData = {
        data: {
          users: username,
        },
      };

      try {
        await axios.post("http://localhost:1337/api/active-users", strapiData);
        socket.emit("roomData", { done: "true" });
      } catch (e) {
        if (e.message.includes("Request failed with status code 400")) {
          socket.emit("roomData", { done: "existing" });
        } else {
          console.error("Error storing active user:", e.message);
        }
      }
    } else {
      console.log("An error occurred: Username is required");
    }
  });

  socket.on("sendMessage", async (data) => {
    let strapiData = {
      data: {
        user: data.user,
        message: data.message,
        recipient: data.recipient
      },
    };

    console.log(data);
    
    try {
      await axios.post("http://localhost:1337/api/messages", strapiData);
      socket.broadcast.to("group").emit("message", {
        user: data.user,
        text: data.message,
        timestamp: new Date().toISOString(),
        recipient: data.recipient
      });
    } catch (e) {
      console.error("Error storing message:", e.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
},
};