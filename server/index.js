import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

import Contact from "./models/Contact.js";
import Innovation from "./models/Innovation.js";
import Product from "./models/Product.js";
import Review from "./models/Review.js";
import adminRoutes from "./routes/admin.js";
import contentRoutes from "./routes/content.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JWT_SECRET = process.env.JWT_SECRET || "modha-jwt-secret-change-this-in-production";

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

function isDBReady() {
  return mongoose.connection.readyState === 1;
}

// Seed fallback data
const seedProducts = [
  {
    _id: "seed-product-1",
    slug: "modha-pedal-operating-machine",
    name: "Modha Pedal Operating Machine",
    shortDescription:
      "Modha Pedal Operation Machine is designed to improve the comfort and efficiency of traditional handloom weaving.",
    description:
      "Modha Pedal Operation Machine is designed to improve the comfort and efficiency of traditional handloom weaving. It upgrades the existing pedal system with a smoother and more responsive mechanism, reducing the physical effort required by the weaver. This makes the weaving process easier, less tiring, and more productive while still maintaining the traditional setup.",
    features: [
      "Comfortable pedal design that reduces strain",
      "Smooth and effortless operation",
      "Improves weaving speed and efficiency",
      "Reduces fatigue for longer working hours",
      "Easy to install on existing handlooms",
      "Strong and durable for daily use",
    ],
    dimensions: "Customizable to loom size",
    rating: 4.8,
    image: "/images/product-hero.jpg",
  },
];

const seedInnovations = [
  {
    _id: "seed-innovation-1",
    title: "Modha Jacquard Machine",
    description:
      "Modha Jacquard Machine is designed to improve the efficiency and precision of traditional handloom weaving. It upgrades the existing jacquard system with a digital mechanism, replacing manual punch cards with an easy-to-use USB-based design process.",
    status: "pending",
    image: "/images/innovation-jacquard.jpg",
  },
  {
    _id: "seed-innovation-2",
    title: "Modha Pedal Operation Machine",
    description:
      "Modha Pedal Operation Machine is designed to improve the comfort and efficiency of traditional handloom weaving. It upgrades the existing pedal system with a smoother and more responsive mechanism, reducing the physical effort required by the weaver.",
    status: "pending",
    image: "/images/innovation-pedal.jpg",
  },
];

const seedReviews = [
  {
    _id: "seed-review-1",
    quote:
      "It has been really good. I've been using it for 6 months, and it was easy to set up without any tutorial. It fits well into my workflow and has made the process simpler and more comfortable.",
    author: "Weaver",
    product: "Modha Pedal Operating Machine",
  },
  {
    _id: "seed-review-2",
    quote:
      "I've been using this for 3 years and it's been very effective. We installed it ourselves using the YouTube video. Only a minor repair was needed once, which we fixed easily with guidance. My leg pain is gone, and work feels much more comfortable.",
    author: "Weaver",
    product: "Modha Pedal Operating Machine",
  },
  {
    _id: "seed-review-3",
    quote:
      "It has been really good. After I became disabled, Sivakumar Modha personally helped by making a machine for me. It's been 3 years with no repairs, and it has given me a way to live independently again. He has also supported around 150 members in Jangam Jilla.",
    author: "Artisan, Jangam Jilla",
    product: "Modha Pedal Operating Machine",
  },
];

const seedContent = [
  { section: "home", key: "hero-heading", value: "Modha Technologies", type: "text", label: "Hero Heading" },
  { section: "home", key: "hero-tagline", value: "Empowering the hands that clothe the nation", type: "text", label: "Hero Tagline" },
  { section: "home", key: "hero-cta", value: "Explore the product", type: "text", label: "Hero CTA Button" },
  { section: "home", key: "hero-badge", value: "Modha Pedal", type: "text", label: "Hero Badge" },
  { section: "home", key: "hero-image", value: "/images/machine.jpg", type: "image", label: "Hero Background Image" },
  { section: "home", key: "features-heading", value: "Key Features", type: "text", label: "Features Section Heading" },
  { section: "home", key: "features-image", value: "/images/Group 106.jpg", type: "image", label: "Features Image" },
  { section: "home", key: "video-heading", value: "Installation Video", type: "text", label: "Video Section Heading" },
  { section: "home", key: "video-thumbnail", value: "/images/Group 9.jpg", type: "image", label: "Video Thumbnail" },
  { section: "home", key: "testimonials-heading", value: "Voices From The Loom", type: "text", label: "Testimonials Heading" },
  { section: "home", key: "awards-heading", value: "Awards & Recognition", type: "text", label: "Awards Heading" },
  { section: "home", key: "awards-image-1", value: "/images/Group 134.jpg", type: "image", label: "Award Image 1" },
  { section: "home", key: "awards-image-2", value: "/images/Group 134.jpg", type: "image", label: "Award Image 2" },
  { section: "product", key: "name", value: "Modha Pedal Operating Machine", type: "text", label: "Product Name" },
  { section: "product", key: "description", value: "The Modha Pedal Operating Machine is a revolutionary innovation that empowers handloom weavers with efficient, ergonomic operation.", type: "text", label: "Product Description" },
  { section: "product", key: "video-heading", value: "Installation Video", type: "text", label: "Product Video Heading" },
  { section: "product", key: "video-thumbnail", value: "/images/Group 9.jpg", type: "image", label: "Product Video Thumbnail" },
  { section: "innovations", key: "hero-heading", value: "Beyond The Flagship", type: "text", label: "Innovations Hero Heading" },
  { section: "innovations", key: "hero-image", value: "/images/face.jpg", type: "image", label: "Innovations Hero Image" },
  { section: "about", key: "hero-heading", value: "A Map of purpose", type: "text", label: "About Hero Heading" },
  { section: "about", key: "hero-image", value: "/images/new face.jpg", type: "image", label: "About Hero Image" },
  { section: "contact", key: "heading", value: "How can we help?", type: "text", label: "Contact Heading" },
  { section: "contact", key: "phone", value: "+91 81438 24009", type: "text", label: "Contact Phone Number" },
];

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", db: isDBReady() ? "connected" : "unavailable" });
});

app.get("/api/products", async (_req, res) => {
  if (!isDBReady()) return res.json(seedProducts);
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products.length ? products : seedProducts);
  } catch {
    res.json(seedProducts);
  }
});

app.get("/api/products/:slug", async (req, res) => {
  if (!isDBReady()) {
    const p = seedProducts.find((p) => p.slug === req.params.slug);
    return p ? res.json(p) : res.status(404).json({ message: "Product not found" });
  }
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch {
    const p = seedProducts.find((p) => p.slug === req.params.slug);
    return p ? res.json(p) : res.status(404).json({ message: "Product not found" });
  }
});

app.get("/api/innovations", async (req, res) => {
  if (!isDBReady()) {
    const filter = req.query.status ? seedInnovations.filter((i) => i.status === req.query.status) : seedInnovations;
    return res.json(filter);
  }
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const innovations = await Innovation.find(filter).sort({ createdAt: -1 });
    res.json(innovations.length ? innovations : seedInnovations);
  } catch {
    const filter = req.query.status ? seedInnovations.filter((i) => i.status === req.query.status) : seedInnovations;
    res.json(filter);
  }
});

app.get("/api/reviews", async (_req, res) => {
  if (!isDBReady()) return res.json(seedReviews);
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews.length ? reviews : seedReviews);
  } catch {
    res.json(seedReviews);
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required" });
  }
  if (!isDBReady()) {
    return res.status(201).json({ _id: "seed-contact", name, email, phone, message });
  }
  try {
    const contact = await Contact.create({ name, email, phone, message });
    res.status(201).json(contact);
  } catch (error) {
    res.status(201).json({ _id: "seed-contact", name, email, phone, message });
  }
});

// Content routes with fallback
app.use("/api/content", (req, res, next) => {
  if (!isDBReady()) {
    const match = req.path.match(/^\/([^/]+)(?:\/([^/]+))?$/);
    if (match) {
      const section = match[1];
      const key = match[2];
      const items = seedContent.filter((c) => c.section === section);
      if (key) {
        const item = items.find((c) => c.key === key);
        return item ? res.json(item) : res.status(404).json({ message: "Content not found" });
      }
      const map = {};
      for (const item of items) {
        map[item.key] = { id: item._id, value: item.value, type: item.type, label: item.label };
      }
      return res.json(map);
    }
  }
  next();
}, contentRoutes);

// Admin routes with DB fallback
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@modha.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ id: "dev-admin", email }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, admin: { id: "dev-admin", name: "Admin", email } });
  }

  if (!isDBReady()) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    const Admin = (await import("./models/Admin.js")).default;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/api/admin/me", (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(header.split(" ")[1], JWT_SECRET);
    res.json({ id: decoded.id, name: "Admin", email: decoded.email });
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.get("/api/admin/content", (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    jwt.verify(header.split(" ")[1], JWT_SECRET);
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  if (!isDBReady()) {
    const grouped = {};
    for (const item of seedContent) {
      if (!grouped[item.section]) grouped[item.section] = [];
      grouped[item.section].push({ ...item, _id: item.key });
    }
    return res.json(grouped);
  }

  const Content = seedContent; // fallback; use DB if available
  Content.findOne
    ? (async () => {
        try {
          const { default: ContentModel } = await import("./models/Content.js");
          const contents = await ContentModel.find().sort({ section: 1, key: 1 });
          const grouped = {};
          for (const item of contents) {
            if (!grouped[item.section]) grouped[item.section] = [];
            grouped[item.section].push(item);
          }
          res.json(grouped);
        } catch {
          const grouped = {};
          for (const item of seedContent) {
            if (!grouped[item.section]) grouped[item.section] = [];
            grouped[item.section].push({ ...item, _id: item.key });
          }
          res.json(grouped);
        }
      })()
    : (() => {
        const grouped = {};
        for (const item of seedContent) {
          if (!grouped[item.section]) grouped[item.section] = [];
          grouped[item.section].push({ ...item, _id: item.key });
        }
        res.json(grouped);
      })();
});

app.put("/api/admin/content/:id", (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    jwt.verify(header.split(" ")[1], JWT_SECRET);
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const { value } = req.body;
  const item = seedContent.find((c) => c.key === req.params.id);
  if (item) {
    item.value = value;
    return res.json({ ...item, _id: item.key });
  }

  if (!isDBReady()) {
    return res.status(404).json({ message: "Content not found" });
  }

  import("./models/Content.js").then(({ default: ContentModel }) => {
    ContentModel.findByIdAndUpdate(req.params.id, { value }, { new: true })
      .then((updated) => {
        if (!updated) return res.status(404).json({ message: "Content not found" });
        res.json(updated);
      })
      .catch(() => res.status(404).json({ message: "Content not found" }));
  });
});

app.post("/api/admin/upload", (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    jwt.verify(header.split(" ")[1], JWT_SECRET);
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  import("multer").then(({ default: multer }) => {
    const storage = multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, path.join(__dirname, "uploads")),
      filename: (_req, _file, cb) => {
        const ext = path.extname(_file.originalname);
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
      },
    });
    const upload = multer({
      storage,
      fileFilter: (_req, file, cb) => {
        const allowed = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
        cb(null, allowed.test(path.extname(file.originalname)));
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }).single("image");

    upload(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      if (!req.file) return res.status(400).json({ message: "No file uploaded" });
      res.json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
    });
  });
});

app.post("/api/admin/seed-admin", async (_req, res) => {
  res.json({ message: "No DB — using env admin credentials", email: process.env.ADMIN_EMAIL || "admin@modha.com" });
});

async function start() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/modha-technologies";
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.warn("MongoDB unavailable — using in-memory fallback data:", error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
