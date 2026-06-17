import { useState } from "react";
import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { NotificationsPage } from "./pages/NotificationsPage";
import { PriorityNotificationsPage } from "./pages/PriorityNotificationsPage";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("all");
  return <><CssBaseline /><AppBar position="static" color="default" elevation={1}><Toolbar sx={{ gap: 1 }}><NotificationsIcon color="primary" /><Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>Campus Notifications</Typography><Button startIcon={<NotificationsIcon />} variant={page === "all" ? "contained" : "text"} onClick={() => setPage("all")}>All</Button><Button startIcon={<PriorityHighIcon />} variant={page === "priority" ? "contained" : "text"} onClick={() => setPage("priority")}>Priority</Button></Toolbar></AppBar><Box className="app-bg"><Container maxWidth="md" sx={{ py: 3 }}>{page === "all" ? <NotificationsPage /> : <PriorityNotificationsPage />}</Container></Box></>;
}
