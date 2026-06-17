import { useState } from "react";
import { Alert, Box, CircularProgress, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

const getId = notification => notification.ID || notification.id;

export function PriorityNotificationsPage() {
  const [type, setType] = useState("All");
  const [limit, setLimit] = useState(10);
  const { notifications, viewedIds, loading, error, markViewed } = useNotifications({ limit, type, priority: true });
  return <Stack spacing={2}><Box><Typography variant="h4" fontWeight={800}>Priority Inbox</Typography><Typography color="text.secondary">Unread notifications ranked by Placement, Result, Event, and latest time.</Typography></Box><Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}><NotificationFilter value={type} onChange={setType} /><TextField select size="small" label="Top n" value={limit} onChange={e => setLimit(Number(e.target.value))} sx={{ width: 120 }}>{[10, 15, 20].map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}</TextField></Stack>{loading && <Box sx={{ textAlign: "center", py: 5 }}><CircularProgress /></Box>}{error && <Alert severity="error">{error}</Alert>}{!loading && !error && notifications.length === 0 && <Alert severity="info">No unread priority notifications.</Alert>}{!loading && !error && notifications.map(notification => <NotificationCard key={getId(notification)} notification={notification} viewed={viewedIds.includes(getId(notification))} onView={markViewed} />)}</Stack>;
}
