import { useState, useEffect } from "react";
import { Log } from "../../../logging-middleware/index.js";
import { fetchNotifications } from "../api/notifications";

const log = (level, message) => Log("frontend", level, "hook", message).catch(() => null);

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        log("debug", "loading notifications");
        const data = await fetchNotifications();
        setNotifications(data.notifications ?? []);
        setTotal(data.total ?? 0);
        log("info", "notifications loaded successfully");
      } catch {
        log("error", "failed to load notifications");
      }
    };

    load();
  }, []);

  const totalPages = 0;

  return { notifications, total, totalPages, loading: false, error: true };
}
