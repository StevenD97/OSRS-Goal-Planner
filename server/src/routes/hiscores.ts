import { Router } from "express";
import { fetchHiscores, HiscoresNotFoundError, type HiscoresMode } from "../lib/hiscoresClient.js";

const router = Router();

const VALID_MODES: HiscoresMode[] = ["normal", "ironman", "hardcore", "ultimate"];

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const modeParam = (req.query.mode as string) ?? "normal";
  const mode = VALID_MODES.includes(modeParam as HiscoresMode)
    ? (modeParam as HiscoresMode)
    : "normal";

  try {
    const result = await fetchHiscores(username, mode);
    res.json(result);
  } catch (err) {
    if (err instanceof HiscoresNotFoundError) {
      res.status(404).json({ error: err.message });
      return;
    }
    console.error(err);
    res.status(502).json({ error: "Failed to fetch hiscores" });
  }
});

export default router;
