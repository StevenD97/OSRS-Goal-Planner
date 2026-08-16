import { fetchWikiSyncPlayer, WikiSyncNotSyncedError } from "../../_shared/wikisync";
import { CACHE_CONTROL } from "../../_shared/config";

export const onRequestGet: PagesFunction = async (context) => {
  const username = String(context.params.username ?? "");

  try {
    const result = await fetchWikiSyncPlayer(username);
    return Response.json(result, { headers: { "Cache-Control": CACHE_CONTROL } });
  } catch (err) {
    if (err instanceof WikiSyncNotSyncedError) {
      return Response.json({ error: err.message }, { status: 404 });
    }
    console.error(err);
    return Response.json({ error: "Failed to fetch WikiSync data" }, { status: 502 });
  }
};
