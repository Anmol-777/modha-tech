import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { useAdmin } from "../context/AdminContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { setAdmin } = useAdmin();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const result = await login(email, password);
      localStorage.setItem("adminToken", result.token);
      setAdmin(result.admin);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#DDE8D3",
      padding: 20,
      marginTop: 64,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        borderRadius: 20,
        padding: "40px 32px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 28,
          color: "#48663F",
          textAlign: "center",
          marginBottom: 8,
        }}>
          Admin Login
        </h1>
        <p style={{ textAlign: "center", fontSize: 14, color: "#888", marginBottom: 24 }}>
          Sign in to manage your content
        </p>

        {error && (
          <div style={{
            background: "#fef2f2",
            color: "#dc2626",
            padding: "10px 14px",
            borderRadius: 8,
            fontSize: 13,
            marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#2E2E2E", marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#2E2E2E", marginBottom: 6 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            padding: "14px",
            background: busy ? "#a0b89a" : "#496C42",
            color: "#fff",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600,
            border: "none",
            cursor: busy ? "not-allowed" : "pointer",
          }}
        >
          {busy ? "Signing in..." : "Sign In"}
        </button>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <a href="/" style={{ fontSize: 13, color: "#48663F" }}>
            &larr; Back to website
          </a>
        </div>
      </form>
    </div>
  );
}
