import express from "express";
import "dotenv/config";
import cors from "cors";
import logger from "pino-http";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Retrieved all notes" });
});

app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

app.use("/test-error", (req, res, next) => {
  throw new Error("Simulated server error");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log("server run!");
});
