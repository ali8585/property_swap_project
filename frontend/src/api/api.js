const API_URL = "http://localhost:8000/api"; // آدرس بک‌اند شما

export async function login(username, password) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  const res = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
}

export async function register(username, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) throw new Error("Register failed");
  return await res.json();
}

export async function fetchUserProfile(token) {
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Fetch profile failed");
  return await res.json();
}

export async function fetchProperties(token) {
  const res = await fetch(`${API_URL}/properties/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Fetch properties failed");
  return await res.json();
}

export async function createProperty(token, property) {
  const res = await fetch(`${API_URL}/properties/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(property),
  });
  if (!res.ok) throw new Error("Create property failed");
  return await res.json();
}

export async function uploadCSV(token, file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/properties/upload-csv/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error("CSV upload failed");
  return await res.json();
}

export async function fetchRecommendations(token) {
  const res = await fetch(`${API_URL}/properties/recommendations/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Fetch recommendations failed");
  return await res.json();
}
