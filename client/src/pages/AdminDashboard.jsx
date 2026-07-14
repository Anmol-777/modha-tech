import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminContent, updateContent, uploadImage } from "../api";
import { useAdmin } from "../context/AdminContext";

export default function AdminDashboard() {
  const { admin, logout, editMode, setEditMode, loading } = useAdmin();
  const navigate = useNavigate();
  const [groups, setGroups] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [uploadingId, setUploadingId] = useState(null);
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!admin) { navigate("/admin/login"); return }
    getAdminContent().then(setGroups).catch(() => {});
  }, [admin, loading, navigate]);

  async function handleSave(id) {
    setSaving(id);
    try {
      await updateContent(id, editValue);
      setGroups((prev) => {
        const next = { ...prev };
        for (const section of Object.keys(next)) {
          next[section] = next[section].map((item) =>
            item._id === id ? { ...item, value: editValue } : item
          );
        }
        return next;
      });
      setEditing(null);
      setMessage("Saved successfully");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setSaving(null);
    }
  }

  async function handleImageUpload(id, file) {
    setUploadingId(id);
    try {
      const result = await uploadImage(file);
      await updateContent(id, result.path);
      setGroups((prev) => {
        const next = { ...prev };
        for (const section of Object.keys(next)) {
          next[section] = next[section].map((item) =>
            item._id === id ? { ...item, value: result.path } : item
          );
        }
        return next;
      });
      setMessage("Image updated");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setUploadingId(null);
    }
  }

  if (!groups) {
    return (
      <div style={{ marginTop: 64, padding: 40, textAlign: "center", color: "#888" }}>
        {loading ? "Checking authentication..." : "Loading content..."}
      </div>
    );
  }

  const sectionLabels = {
    home: "Home Page",
    product: "Product Page",
    innovations: "Innovations Page",
    about: "About Page",
    contact: "Contact Page",
  };

  return (
    <div style={{ marginTop: 64, minHeight: "100vh", background: "#f5f7f2" }}>
      <div style={{
        position: "sticky",
        top: 64,
        zIndex: 40,
        background: "#fff",
        borderBottom: "1px solid #e0e0e0",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div>
          <span style={{ fontSize: 18, fontWeight: 600, color: "#48663F" }}>
            Content Manager
          </span>
          <span style={{ fontSize: 13, color: "#888", marginLeft: 12 }}>
            {admin?.name || admin?.email}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={editMode}
              onChange={(e) => setEditMode(e.target.checked)}
            />
            Edit Mode
          </label>
          <button
            onClick={logout}
            style={{
              padding: "8px 16px",
              background: "#dc2626",
              color: "#fff",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Logout
          </button>
          <a href="/" style={{
            padding: "8px 16px",
            background: "#496C42",
            color: "#fff",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
          }}>
            View Site
          </a>
        </div>
      </div>

      {message && (
        <div style={{
          padding: "10px 20px",
          background: message.includes("Error") ? "#fef2f2" : "#f0fdf4",
          color: message.includes("Error") ? "#dc2626" : "#16a34a",
          fontSize: 14,
          fontWeight: 500,
        }}>
          {message}
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        {Object.entries(groups).map(([section, items]) => (
          <div key={section} style={{
            background: "#fff",
            borderRadius: 12,
            marginBottom: 20,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}>
            <div style={{
              padding: "14px 20px",
              background: "#DDE8D3",
              fontWeight: 600,
              fontSize: 16,
              color: "#2E2E2E",
            }}>
              {sectionLabels[section] || section.charAt(0).toUpperCase() + section.slice(1)}
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#888", whiteSpace: "nowrap" }}>Label</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#888", whiteSpace: "nowrap" }}>Key</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#888", whiteSpace: "nowrap" }}>Type</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#888", whiteSpace: "nowrap" }}>Value</th>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#888", whiteSpace: "nowrap" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                      <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
                        {item.label || item.key}
                      </td>
                      <td style={{ padding: "10px 16px", fontSize: 12, color: "#888", fontFamily: "monospace" }}>
                        {item.key}
                      </td>
                      <td style={{ padding: "10px 16px", fontSize: 12 }}>
                        <span style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          background: item.type === "image" ? "#ede9fe" : "#dbeafe",
                          color: item.type === "image" ? "#7c3aed" : "#2563eb",
                        }}>
                          {item.type}
                        </span>
                      </td>
                      <td style={{ padding: "10px 16px", fontSize: 13, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.type === "image" ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <img
                              src={item.value}
                              alt=""
                              style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover", background: "#f0f0f0" }}
                              onError={(e) => { e.target.style.display = "none" }}
                            />
                            <span style={{ fontSize: 12, color: "#888" }}>{item.value}</span>
                          </div>
                        ) : (
                          editing === item._id ? (
                            <textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                border: "1px solid #48663F",
                                borderRadius: 4,
                                fontSize: 13,
                                minHeight: 60,
                                resize: "vertical",
                                fontFamily: "inherit",
                              }}
                            />
                          ) : (
                            <span>{item.value || <span style={{ color: "#ccc", fontStyle: "italic" }}>Empty</span>}</span>
                          )
                        )}
                      </td>
                      <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
                        {item.type === "image" ? (
                          <label style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "6px 12px",
                            background: uploadingId === item._id ? "#e0e0e0" : "#f5f5f5",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 500,
                            cursor: uploadingId === item._id ? "wait" : "pointer",
                            color: "#2E2E2E",
                          }}>
                            {uploadingId === item._id ? "Uploading..." : "Upload"}
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              disabled={uploadingId === item._id}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(item._id, file);
                                e.target.value = "";
                              }}
                            />
                          </label>
                        ) : editing === item._id ? (
                          <div style={{ display: "flex", gap: 4 }}>
                            <button
                              onClick={() => handleSave(item._id)}
                              disabled={saving === item._id}
                              style={{
                                padding: "6px 12px",
                                background: saving === item._id ? "#a0b89a" : "#496C42",
                                color: "#fff",
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 500,
                              }}
                            >
                              {saving === item._id ? "..." : "Save"}
                            </button>
                            <button
                              onClick={() => setEditing(null)}
                              style={{
                                padding: "6px 12px",
                                background: "#f5f5f5",
                                color: "#666",
                                borderRadius: 6,
                                fontSize: 12,
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setEditing(item._id); setEditValue(item.value) }}
                            style={{
                              padding: "6px 12px",
                              background: "#f5f5f5",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 500,
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
