/**
 * OSRS's daily reset happens at 00:00 UTC. We key "today" off that boundary
 * so checklists reset automatically when a new game day starts, regardless
 * of the player's local timezone.
 */
export function osrsDayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD in UTC
}
