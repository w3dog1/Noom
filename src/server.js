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

// 서버가 아니라 socket에 있는 매서드 사용
wss.on("connection", (socket) => {
    console.log("connected to Browser ✔");
    socket.on("close", () => {
        console.log("Disconnected to Server 😒");
    });
    socket.send("hello?");
});

server.listen(3000, handleListen);