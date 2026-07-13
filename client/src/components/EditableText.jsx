import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { updateContent } from "../api";

export default function EditableText({ contentId, value, tag = "span", style, children, ...props }) {
  const { editMode } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value ?? "");
  const [saving, setSaving] = useState(false);

  if (!editMode) {
    const Tag = tag;
    return <Tag style={style} {...props}>{children || text}</Tag>;
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateContent(contentId, text);
      setEditing(false);
    } catch {
      //
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setText(value ?? "");
    setEditing(false);
  }

  return (
    <div style={{ position: "relative", display: "inline" }}>
      {editing ? (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
          onClick={(e) => { if (e.target === e.currentTarget) handleCancel() }}
        >
          <div style={{
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            width: "100%",
            maxWidth: 500,
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#2E2E2E", marginBottom: 12 }}>
              Edit Text
            </h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
              style={{
                width: "100%",
                minHeight: 100,
                padding: "10px 12px",
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                fontSize: 14,
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 12, justifyContent: "flex-end" }}>
              <button
                onClick={handleCancel}
                style={{
                  padding: "8px 16px",
                  background: "#f5f5f5",
                  color: "#666",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: "8px 16px",
                  background: saving ? "#a0b89a" : "#496C42",
                  color: "#fff",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", display: "inline" }}
          onClick={() => setEditing(true)}
        >
          {children || text}
          <span style={{
            position: "absolute",
            top: -8,
            right: -8,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#48663F",
            color: "#fff",
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }} title="Click to edit">
            ✎
          </span>
        </div>
      )}
    </div>
  );
}
