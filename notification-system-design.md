### Stage 1

This notification system lets logged-in students view campus updates like placements, events, and results. The frontend can use simple REST APIs to fetch notifications, filter them, mark them as read, and get real-time updates.

**Main APIs**

GET /api/v1/notifications

GET /api/v1/notifications/:id

PATCH /api/v1/notifications/:id/read

PATCH /api/v1/notifications/read-all

GET /api/v1/notifications/unread-count

POST /api/v1/notifications

DELETE /api/v1/notifications/:id

**Headers**

Authorization: Bearer <access_token>

Content-Type: application/json

**Example Notification Object**

{
"id": "noti_101",
"title": "Placement Drive",
"message": "ABC Tech is visiting campus tomorrow.",
"type": "placement",
"isRead": false,
"createdAt": "2026-06-17T10:00:00Z"
}

**Real-Time Mechanism**

For real-time notifications, the system can use WebSocket. After login, the frontend connects to /api/v1/notifications/live using the access token. When a new notification is created, the backend sends it directly to the logged-in student, and the frontend updates the notification list.
