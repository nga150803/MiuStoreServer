import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./router";
import { connectDB } from "./config";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api", router());

const server = http.createServer(app);

connectDB();

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
});
