const EventEmitter = require("node:events");

class EventBus extends EventEmitter {}

const eventBus = new EventBus();

const user = {
  id: 1,
  name: "alex",
};

function createUser(user) {
  console.log("User created");
}

eventBus.on("createUser", createUser);

eventBus.on("logUser", (user) => {
  console.log(`user ${user.id} with name ${user.name} logged in.`);
});

eventBus.on("welcome user", (user) => {
  console.log(`welcome email sent to ${user.name}`);
});

eventBus.emit("createUser", user);
eventBus.emit("logUser", user);
eventBus.emit("welcome user", user);

eventBus.off("createUser", createUser);
eventBus.emit("createUser", user);
