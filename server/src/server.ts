import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "@configs/db.config";
import socketServer from "./socket";
import errorHandler from "@handlers/errors.handler";
import appRoutes from "@routes/app.route";

// define vars
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const PORT = process.env.PORT || 8080;

// init middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/api/v1/auth", appRoutes.authRoute);
app.use("/api/v1/otp", appRoutes.otpRoute);
app.use("/api/v1/profile", appRoutes.profileRoute);
app.use("/api/v1/post", appRoutes.postRoute);
app.use(errorHandler);

// init socket io server
io.on("connection", socketServer);

// add health check for the api
app.get("/api/v1/health-check", (req, res) => {
  res.status(200).send({ message: "it work's" });
});

// handle database and server app running
connectDB().then(() => {
  server.listen(PORT);
});
