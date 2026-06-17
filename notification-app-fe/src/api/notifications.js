import { Log } from "../../../logging-middleware/index.js";

export async function fetchNotifications() {
  Log("frontend", "info", "api", "fetching notifications").catch(() => null);
  return { notifications: [], total: 0 };
}
