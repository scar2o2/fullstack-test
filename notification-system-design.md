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

### Stage 2

I would use PostgreSQL because notification data has a clear structure and needs reliable filtering, pagination, and unread count queries.

**Tables**

users(id, name, email, role)

notifications(id, title, message, type, created_at)

user_notifications(id, user_id, notification_id, is_read, read_at)

**Example Query**

SELECT n.id, n.title, n.message, n.type, un.is_read
FROM user_notifications un
JOIN notifications n ON n.id = un.notification_id
WHERE un.user_id = 1
ORDER BY n.created_at DESC
LIMIT 10;

**Example Object**

{
"id": 1,
"title": "Placement Drive",
"message": "ABC Tech is visiting campus tomorrow.",
"type": "placement",
"isRead": false
}

**Scaling**

When data grows, fetching notifications and unread counts can become slow. To solve this, I would add indexes on user_id, notification_id, is_read, type, and created_at. I would also use pagination and archive old notifications.
