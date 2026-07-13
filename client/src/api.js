const API = "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("adminToken");
  const headers = { ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message);
  }
  return res.json();
}

export function login(email, password) {
  return request("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getAdminMe() {
  return request("/admin/me");
}

export function getAdminContent() {
  return request("/admin/content");
}

export function updateContent(id, value) {
  return request(`/admin/content/${id}`, {
    method: "PUT",
    body: JSON.stringify({ value }),
  });
}

export function uploadImage(file) {
  const form = new FormData();
  form.append("image", file);
  return request("/admin/upload", { method: "POST", body: form });
}

export function getContent(section) {
  return request(`/content/${section}`);
}

export function submitContactEnquiry(data) {
  return request("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
