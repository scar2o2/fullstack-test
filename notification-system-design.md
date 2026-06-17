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

### Stage 3

The old query is not fully accurate because SELECT * fetches every column and there is no limit. It is also slow because the database may scan many rows, then sort them by createdAt.

**Better Query**

SELECT id, title, message, notificationType, createdAt
FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC
LIMIT 20;

**Index**

CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt DESC);

This index helps because the database can quickly find unread notifications for one student in the correct order. The cost becomes close to O(log n + limit) instead of scanning many rows.

Adding indexes on every column is not a good idea. It makes writes slower, takes more storage, and many indexes may never be used.

**Placement Query**

SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= CURRENT_DATE - INTERVAL '7 days';

For this query, an index on notificationType and createdAt is useful.

CREATE INDEX idx_notifications_type_created
ON notifications(notificationType, createdAt);
