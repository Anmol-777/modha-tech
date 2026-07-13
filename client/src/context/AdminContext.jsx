import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAdminMe } from "../api";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) { setLoading(false); return }
    getAdminMe()
      .then((user) => setAdmin(user))
      .catch(() => localStorage.removeItem("adminToken"))
      .finally(() => setLoading(false));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    setEditMode(false);
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin, editMode, setEditMode, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
