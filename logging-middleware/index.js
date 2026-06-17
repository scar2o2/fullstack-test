const LOG_URL = "http://4.224.186.213/evaluation-service/logs";
const stacks = ["backend", "frontend"];
const levels = ["debug", "info", "warn", "error", "fatal"];
const packages = {
  backend: ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service", "auth", "config", "middleware", "utils"],
  frontend: ["api", "component", "hook", "page", "state", "style", "auth", "config", "middleware", "utils"]
};

export async function Log(stack, level, packageName, message) {
  if (!stacks.includes(stack)) throw new Error("Invalid stack");
  if (!levels.includes(level)) throw new Error("Invalid level");
  if (!packages[stack].includes(packageName)) throw new Error("Invalid package");
  const token = import.meta.env.VITE_LOG_ACCESS_TOKEN;
  if (!token) throw new Error("Missing log access token");
  const response = await fetch(LOG_URL, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ stack, level, package: packageName, message }) });
  if (!response.ok) throw new Error("Log request failed");
  return response.json();
}
