import { fetchHiscores, HiscoresNotFoundError, type HiscoresMode } from "../../_shared/hiscores";
import { CACHE_CONTROL } from "../../_shared/config";

const VALID_MODES: HiscoresMode[] = ["normal", "ironman", "hardcore", "ultimate"];

export const onRequestGet: PagesFunction = async (context) => {
  const username = String(context.params.username ?? "");
  const modeParam = new URL(context.request.url).searchParams.get("mode") ?? "normal";
  const mode = VALID_MODES.includes(modeParam as HiscoresMode)
    ? (modeParam as HiscoresMode)
    : "normal";

  try {
    const result = await fetchHiscores(username, mode);
    return Response.json(result, { headers: { "Cache-Control": CACHE_CONTROL } });
  } catch (err) {
    if (err instanceof HiscoresNotFoundError) {
      return Response.json({ error: err.message }, { status: 404 });
    }
    console.error(err);
    return Response.json({ error: "Failed to fetch hiscores" }, { status: 502 });
  }
};
