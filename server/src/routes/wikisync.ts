import { Router } from "express";
import { fetchWikiSyncPlayer, WikiSyncNotSyncedError } from "../lib/wikisyncClient.js";

const router = Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const result = await fetchWikiSyncPlayer(username);
    res.json(result);
  } catch (err) {
    if (err instanceof WikiSyncNotSyncedError) {
      res.status(404).json({ error: err.message });
      return;
    }
    console.error(err);
    res.status(502).json({ error: "Failed to fetch WikiSync data" });
  }
});

export default router;
