import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

const getColor = type => ({ Placement: "primary", Result: "success", Event: "secondary" }[type] || "default");

export function NotificationCard({ notification, viewed, onView }) {
  return <Paper onClick={() => onView(notification)} variant="outlined" sx={{ p: 2, borderRadius: 1, borderColor: viewed ? "divider" : "primary.main", bgcolor: viewed ? "background.paper" : "primary.50", cursor: "pointer" }}><Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between"><Chip label={notification.Type} color={getColor(notification.Type)} size="small" /><Chip label={viewed ? "Viewed" : "New"} color={viewed ? "default" : "warning"} size="small" /></Stack><Typography variant="h6" sx={{ mt: 1, fontSize: 18 }}>{notification.Message}</Typography><Box sx={{ mt: 1, color: "text.secondary", fontSize: 14 }}>{notification.Timestamp}</Box></Paper>;
}
