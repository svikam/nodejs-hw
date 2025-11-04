import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import pino from "pino-http";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

// GET /test-error
app.get("/test-error", (req, res) => {
  throw new Error("Simulated server error");
});

// GET /notes > {}
app.get("/notes", (req, res) => {
  // throw new Error("Can't get notes!");
  res.status(200).json({
	  message: "Retrieved all notes"
  });
});

// GET /notes/:noteId > {}
app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
	  message: `Retrieved note with ID: ${noteId}`
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  res.status(500).json({
    message: isProd ? "Sorry, we had an error!" : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

