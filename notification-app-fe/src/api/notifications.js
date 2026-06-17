import { Log } from "../../../logging-middleware/index.js";

const API_URL = "/evaluation-service/notifications";
const token = import.meta.env.VITE_NOTIFICATION_ACCESS_TOKEN || import.meta.env.VITE_LOG_ACCESS_TOKEN;
const log = (level, message) => Log("frontend", level, "api", message).catch(() => null);

export async function fetchNotifications({ page = 1, limit = 10, type = "" } = {}) {
  log("info", `fetching notifications page ${page}`);
  const params = new URLSearchParams({ page, limit });
  if (type && type !== "All") params.set("notification_type", type);
  const response = await fetch(`${API_URL}?${params}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) {
    log("error", "failed to fetch notifications");
    throw new Error("Unable to load notifications");
  }
  const data = await response.json();
  log("info", "notifications fetched successfully");
  return { notifications: data.notifications ?? [], total: data.total ?? data.count ?? 0 };
}
