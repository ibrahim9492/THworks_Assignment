const API_BASE = "https://thworks1001.onrender.com/api";

export async function apiRequest(endpoint, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };
  if (auth) headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}
