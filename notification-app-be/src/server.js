const express = require("express");
const dotenv = require("dotenv");
const { getPriorityNotifications } = require("./priorityInbox");
const cors=require('cors')
dotenv.config();

const app = express();
const PORT = 3001;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.json({ message: "Notification backend is running" }));

app.get("/priority-notifications", async (req, res) => {
  try {
    const limit = Number(req.query.n) || 10;
    if (!ACCESS_TOKEN) return res.status(400).json({ success: false, message: "Add ACCESS_TOKEN in .env" });
    const notifications = await getPriorityNotifications(limit, ACCESS_TOKEN);
    res.json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));