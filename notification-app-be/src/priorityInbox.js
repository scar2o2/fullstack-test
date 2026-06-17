const API_URL = "http://4.224.186.213/evaluation-service/notifications";
const weights = { Placement: 3, Result: 2, Event: 1 };

const getScore = notification => (weights[notification.Type] ?? 0) * 10000000000000 + new Date(notification.Timestamp).getTime();

const addToTop = (top, notification, limit) => {
  top.push(notification);
  top.sort((a, b) => getScore(b) - getScore(a));
  if (top.length > limit) top.pop();
  return top;
};

const getPriorityNotifications = async (limit, token) => {
  const response = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  const data = await response.json();
  return (data.notifications ?? []).reduce((top, notification) => addToTop(top, notification, limit), []);
};

module.exports = { getPriorityNotifications };
