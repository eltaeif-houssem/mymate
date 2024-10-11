import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "@configs/db.config";
import socketServer from "./socket";

// define vars
const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080;

// init middlewares
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true, limit: "3mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// init socket io server
io.on("connection", socketServer);

// add health check for the api
app.get("/api/v1/health-check", (req, res) => {
  res.status(200).send({ message: "it work's" });
});

// handle database and server app running
connectDB()
  .then(() => {
    server.listen(PORT);
  })
  .catch(() => {});
