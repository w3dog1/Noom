import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set('view engine', 'pug');
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
//route handler

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// http 서버
const server = http.createServer(app);
// WebSocket 서버 + http 서버를 전달해 줌
const wss = new WebSocket.Server({ server });

// fake database 각기 다른 브라우저 간 소통 가능
const sockets = [];

// 서버가 아니라 socket에 있는 매서드 사용
wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("connected to Browser ✅");
    socket.on("close", () => {
        console.log("Disconnected to Server 😒");
    });
    socket.on("message", (message) => {
        sockets.forEach(aSocket => aSocket.send(message));
        const messageString = message.toString('utf8');
        socket.send(messageString);
    });
});

server.listen(3000, handleListen);