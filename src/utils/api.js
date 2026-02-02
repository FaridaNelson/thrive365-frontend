const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL =", import.meta.env.VITE_API_URL);

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  return localStorage.removeItem("token");
}

export async function api(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type") || "";
  const raw = await res.text();
  const data =
    contentType.includes("application/json") && raw ? JSON.parse(raw) : { raw };

  if (!res.ok) {
    throw new Error(data.message || data.raw || `API error ${res.status}`);
  }

  return data;
}
