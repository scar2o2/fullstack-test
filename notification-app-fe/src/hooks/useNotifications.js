import { useEffect, useMemo, useState } from "react";
import { Log } from "../../../logging-middleware/index.js";
import { fetchNotifications } from "../api/notifications";

const log = (level, message) => Log("frontend", level, "hook", message).catch(() => null);
const getViewed = () => JSON.parse(localStorage.getItem("viewedNotifications") || "[]");
const saveViewed = ids => localStorage.setItem("viewedNotifications", JSON.stringify(ids));
const getId = notification => notification.ID || notification.id;

export function useNotifications({ page = 1, limit = 10, type = "All", priority = false } = {}) {
  const [notifications, setNotifications] = useState([]);
  const [viewedIds, setViewedIds] = useState(getViewed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        log("debug", "loading notifications");
        const data = await fetchNotifications({ page, limit: priority ? 100 : limit, type });
        setNotifications(data.notifications);
        log("info", "notifications loaded");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, limit, type, priority]);

  const markViewed = notification => {
    const id = getId(notification);
    if (!id || viewedIds.includes(id)) return;
    const next = [...viewedIds, id];
    setViewedIds(next);
    saveViewed(next);
    log("info", `notification viewed ${id}`);
  };

  const rankedNotifications = useMemo(() => {
    const weights = { Placement: 3, Result: 2, Event: 1 };
    return notifications.filter(n => !viewedIds.includes(getId(n))).sort((a, b) => ((weights[b.Type] ?? 0) - (weights[a.Type] ?? 0)) || (new Date(b.Timestamp) - new Date(a.Timestamp))).slice(0, limit);
  }, [notifications, viewedIds, limit]);

  return { notifications: priority ? rankedNotifications : notifications, viewedIds, loading, error, markViewed };
}
