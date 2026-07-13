import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import Admin from "../models/Admin.js";
import Content from "../models/Content.js";
import { generateToken, requireAdmin } from "../middleware/auth.js";

const router = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, jpeg, png, gif, webp, svg) are allowed"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/seed-admin", async (_req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL || "admin@modha.com";
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const existing = await Admin.findOne({ email });
    if (existing) return res.json({ message: "Admin already exists" });
    await Admin.create({ email, password, name: "Admin" });
    res.json({ message: "Admin created", email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken({ id: admin._id, email: admin.email });
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", requireAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/content", requireAdmin, async (_req, res) => {
  try {
    const contents = await Content.find().sort({ section: 1, key: 1 });
    const grouped = {};
    for (const item of contents) {
      if (!grouped[item.section]) grouped[item.section] = [];
      grouped[item.section].push(item);
    }
    res.json(grouped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/content/:id", requireAdmin, async (req, res) => {
  try {
    const { value } = req.body;
    const updated = await Content.findByIdAndUpdate(
      req.params.id,
      { value },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Content not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/upload", requireAdmin, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    res.json({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    });
  });
});

export default router;
