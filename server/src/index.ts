import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import hiscoresRouter from "./routes/hiscores.js";
import wikisyncRouter from "./routes/wikisync.js";
import syncRouter from "./routes/sync.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/hiscores", hiscoresRouter);
app.use("/api/wikisync", wikisyncRouter);
app.use("/api/sync", syncRouter);

app.listen(PORT, () => {
  console.log(`osrs-goal-planner server listening on http://localhost:${PORT}`);
});
