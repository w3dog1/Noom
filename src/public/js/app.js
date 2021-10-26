const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("connected to Server ✔");
});

socket.addEventListener("message", (message) => {
    console.log("Just got this: ", message.data, " -from the Server");
});

socket.addEventListener("close", () => {
    console.log("Disconnected to Server 😒");
});