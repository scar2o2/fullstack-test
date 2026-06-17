import { useState } from "react";
import { Alert, Box, CircularProgress, Pagination, Stack, Typography } from "@mui/material";
import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

const getId = notification => notification.ID || notification.id;

export function NotificationsPage() {
  const [type, setType] = useState("All");
  const [page, setPage] = useState(1);
  const { notifications, viewedIds, loading, error, markViewed } = useNotifications({ page, limit: 10, type });
  return <Stack spacing={2}><Box><Typography variant="h4" fontWeight={800}>All Notifications</Typography><Typography color="text.secondary">Latest campus updates for placements, results, and events.</Typography></Box><NotificationFilter value={type} onChange={value => { setType(value); setPage(1); }} />{loading && <Box sx={{ textAlign: "center", py: 5 }}><CircularProgress /></Box>}{error && <Alert severity="error">{error}</Alert>}{!loading && !error && notifications.length === 0 && <Alert severity="info">No notifications found.</Alert>}{!loading && !error && notifications.map(notification => <NotificationCard key={getId(notification)} notification={notification} viewed={viewedIds.includes(getId(notification))} onView={markViewed} />)}<Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}><Pagination count={5} page={page} onChange={(_, value) => setPage(value)} color="primary" /></Box></Stack>;
}
