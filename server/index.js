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
  { section: "home", key: "testimonial-1-quote", value: "It has been really good. I've been using it for 6 months. It fits well into my workflow and has made the process simpler.", type: "text", label: "Testimonial 1 Quote" },
  { section: "home", key: "testimonial-1-author", value: "Weaver", type: "text", label: "Testimonial 1 Author" },
  { section: "home", key: "testimonial-1-image", value: "/images/Property 1=Default.jpg", type: "image", label: "Testimonial 1 Image" },
  { section: "home", key: "testimonial-2-quote", value: "I've been using this for 3 years and it's been very effective. My leg pain is gone, and work feels much more comfortable.", type: "text", label: "Testimonial 2 Quote" },
  { section: "home", key: "testimonial-2-author", value: "Weaver", type: "text", label: "Testimonial 2 Author" },
  { section: "home", key: "testimonial-2-image", value: "/images/Property 1=Default-1.jpg", type: "image", label: "Testimonial 2 Image" },
  { section: "home", key: "testimonial-read-more", value: "Read more", type: "text", label: "Testimonial Read More" },
  { section: "home", key: "awards-heading", value: "Awards & Recognition", type: "text", label: "Awards Heading" },
  { section: "home", key: "awards-image-1", value: "/images/Group 134.jpg", type: "image", label: "Award Image 1" },
  { section: "home", key: "awards-image-2", value: "/images/Group 134.jpg", type: "image", label: "Award Image 2" },
  { section: "product", key: "name", value: "Modha Pedal Operating Machine", type: "text", label: "Product Name" },
  { section: "product", key: "description", value: "The Modha Pedal Operating Machine is a revolutionary innovation that empowers handloom weavers with efficient, ergonomic operation.", type: "text", label: "Product Description" },
  { section: "product", key: "gallery-image-1", value: "/images/image-14.jpg", type: "image", label: "Gallery Image 1" },
  { section: "product", key: "gallery-image-2", value: "/images/image-15.jpg", type: "image", label: "Gallery Image 2" },
  { section: "product", key: "gallery-image-3", value: "/images/image-18.jpg", type: "image", label: "Gallery Image 3" },
  { section: "product", key: "tab-description", value: "Description", type: "text", label: "Tab: Description" },
  { section: "product", key: "tab-specs", value: "Tech Specs", type: "text", label: "Tab: Tech Specs" },
  { section: "product", key: "description-content", value: "Modha Pedal Operation Machine is designed to improve the comfort and efficiency of traditional handloom weaving. It upgrades the existing pedal system with a smoother and more responsive mechanism, reducing the physical effort required by the weaver.", type: "text", label: "Description Content" },
  { section: "product", key: "key-features-heading", value: "Key Features", type: "text", label: "Key Features Heading" },
  { section: "product", key: "feature-1", value: "Comfortable pedal design that reduces strain", type: "text", label: "Feature 1" },
  { section: "product", key: "feature-2", value: "Smooth and effortless operation", type: "text", label: "Feature 2" },
  { section: "product", key: "feature-3", value: "Improves weaving speed and efficiency", type: "text", label: "Feature 3" },
  { section: "product", key: "feature-4", value: "Reduces fatigue for longer working hours", type: "text", label: "Feature 4" },
  { section: "product", key: "feature-5", value: "Easy to install on existing handlooms", type: "text", label: "Feature 5" },
  { section: "product", key: "feature-6", value: "Strong and durable for daily use", type: "text", label: "Feature 6" },
  { section: "product", key: "spec-dimensions-label", value: "Dimensions", type: "text", label: "Spec: Dimensions Label" },
  { section: "product", key: "spec-dimensions-value", value: "Customizable to loom size", type: "text", label: "Spec: Dimensions Value" },
  { section: "product", key: "spec-motor-label", value: "Motor", type: "text", label: "Spec: Motor Label" },
  { section: "product", key: "spec-motor-value", value: "High torque, low noise", type: "text", label: "Spec: Motor Value" },
  { section: "product", key: "spec-power-label", value: "Power", type: "text", label: "Spec: Power Label" },
  { section: "product", key: "spec-power-value", value: "0.5 HP, energy efficient", type: "text", label: "Spec: Power Value" },
  { section: "product", key: "spec-build-label", value: "Build", type: "text", label: "Spec: Build Label" },
  { section: "product", key: "spec-build-value", value: "Mild steel with powder coating", type: "text", label: "Spec: Build Value" },
  { section: "product", key: "spec-backup-label", value: "Backup", type: "text", label: "Spec: Backup Label" },
  { section: "product", key: "spec-backup-value", value: "Manual operation during power cut", type: "text", label: "Spec: Backup Value" },
  { section: "product", key: "spec-maintenance-label", value: "Maintenance", type: "text", label: "Spec: Maintenance Label" },
  { section: "product", key: "spec-maintenance-value", value: "Minimal, once a year servicing", type: "text", label: "Spec: Maintenance Value" },
  { section: "product", key: "video-heading", value: "Installation Video", type: "text", label: "Product Video Heading" },
  { section: "product", key: "video-thumbnail", value: "/images/Group 9.jpg", type: "image", label: "Product Video Thumbnail" },
  { section: "product", key: "watch-to-install", value: "Watch the full installation process in the video below", type: "text", label: "Watch to Install" },
  { section: "product", key: "testimonials-heading", value: "Voices From The Loom", type: "text", label: "Product Testimonials Heading" },
  { section: "product", key: "testimonial-1-image", value: "/images/Property 1=Default.jpg", type: "image", label: "Product Testimonial 1 Image" },
  { section: "product", key: "testimonial-1-quote", value: "It has been really good. I've been using it for 6 months.", type: "text", label: "Product Testimonial 1 Quote" },
  { section: "product", key: "testimonial-1-author", value: "Weaver", type: "text", label: "Product Testimonial 1 Author" },
  { section: "product", key: "testimonial-2-image", value: "/images/Property 1=Default-1.jpg", type: "image", label: "Product Testimonial 2 Image" },
  { section: "product", key: "testimonial-2-quote", value: "I've been using this for 3 years and it's been very effective.", type: "text", label: "Product Testimonial 2 Quote" },
  { section: "product", key: "testimonial-2-author", value: "Weaver", type: "text", label: "Product Testimonial 2 Author" },
  { section: "product", key: "testimonial-read-more", value: "Read more →", type: "text", label: "Testimonial Read More" },
  { section: "innovations", key: "hero-heading", value: "Beyond The Flagship", type: "text", label: "Innovations Hero Heading" },
  { section: "innovations", key: "hero-image", value: "/images/face.jpg", type: "image", label: "Innovations Hero Image" },
  { section: "innovations", key: "filter-all", value: "All", type: "text", label: "Filter: All" },
  { section: "innovations", key: "filter-patented", value: "Patented", type: "text", label: "Filter: Patented" },
  { section: "innovations", key: "filter-pending", value: "Pending", type: "text", label: "Filter: Pending" },
  { section: "innovations", key: "innovation-1-title", value: "Blue Machine", type: "text", label: "Innovation 1 Title" },
  { section: "innovations", key: "innovation-1-desc", value: "Modha Jacquard Machine is designed to improve the efficiency and precision of traditional handloom weaving.", type: "text", label: "Innovation 1 Description" },
  { section: "innovations", key: "innovation-1-image", value: "/images/blue machine.jpg", type: "image", label: "Innovation 1 Image" },
  { section: "innovations", key: "innovation-1-status", value: "Pending", type: "text", label: "Innovation 1 Status" },
  { section: "innovations", key: "innovation-2-title", value: "Cycle Machine", type: "text", label: "Innovation 2 Title" },
  { section: "innovations", key: "innovation-2-desc", value: "Modha Pedal Operation Machine upgrades the existing pedal system with a smoother and more responsive mechanism.", type: "text", label: "Innovation 2 Description" },
  { section: "innovations", key: "innovation-2-image", value: "/images/cycle machine.jpg", type: "image", label: "Innovation 2 Image" },
  { section: "innovations", key: "innovation-2-status", value: "Patented", type: "text", label: "Innovation 2 Status" },
  { section: "innovations", key: "innovation-3-title", value: "Garbage Container", type: "text", label: "Innovation 3 Title" },
  { section: "innovations", key: "innovation-3-desc", value: "An innovative waste management solution designed for handloom communities.", type: "text", label: "Innovation 3 Description" },
  { section: "innovations", key: "innovation-3-image", value: "/images/garbage container.jpg", type: "image", label: "Innovation 3 Image" },
  { section: "innovations", key: "innovation-3-status", value: "Patented", type: "text", label: "Innovation 3 Status" },
  { section: "innovations", key: "innovation-4-title", value: "Raksha", type: "text", label: "Innovation 4 Title" },
  { section: "innovations", key: "innovation-4-desc", value: "A safety device designed to protect weavers from injuries during the weaving process.", type: "text", label: "Innovation 4 Description" },
  { section: "innovations", key: "innovation-4-image", value: "/images/raksha.jpg", type: "image", label: "Innovation 4 Image" },
  { section: "innovations", key: "innovation-4-status", value: "Patented", type: "text", label: "Innovation 4 Status" },
  { section: "about", key: "hero-heading", value: "A Map of purpose", type: "text", label: "About Hero Heading" },
  { section: "about", key: "hero-image", value: "/images/new face.jpg", type: "image", label: "About Hero Image" },
  { section: "about", key: "subheading", value: "our journey", type: "text", label: "Our Journey Subheading" },
  { section: "about", key: "timeline-1-title", value: "The Question", type: "text", label: "Timeline 1 Title" },
  { section: "about", key: "timeline-1-text", value: "It began with a simple question...", type: "text", label: "Timeline 1 Text" },
  { section: "about", key: "timeline-1-image", value: "/images/question.jpg", type: "image", label: "Timeline 1 Image" },
  { section: "about", key: "timeline-2-title", value: "The Sacrifice", type: "text", label: "Timeline 2 Title" },
  { section: "about", key: "timeline-2-text", value: "Born to a school watchman and a school aide...", type: "text", label: "Timeline 2 Text" },
  { section: "about", key: "timeline-2-image", value: "/images/sacrifice.jpg", type: "image", label: "Timeline 2 Image" },
  { section: "about", key: "timeline-3-title", value: "The Test", type: "text", label: "Timeline 3 Title" },
  { section: "about", key: "timeline-3-text", value: "Then life tested him...", type: "text", label: "Timeline 3 Text" },
  { section: "about", key: "timeline-3-image", value: "/images/test.jpg", type: "image", label: "Timeline 3 Image" },
  { section: "about", key: "timeline-4-title", value: "Discovery", type: "text", label: "Timeline 4 Title" },
  { section: "about", key: "timeline-4-text", value: "In Hyderabad, through years of persistence...", type: "text", label: "Timeline 4 Text" },
  { section: "about", key: "timeline-4-image", value: "/images/discovery.jpg", type: "image", label: "Timeline 4 Image" },
  { section: "about", key: "timeline-5-title", value: "Breakthrough", type: "text", label: "Timeline 5 Title" },
  { section: "about", key: "timeline-5-text", value: "After years of effort, the Modha Pedal Operating Machine came to life.", type: "text", label: "Timeline 5 Text" },
  { section: "about", key: "timeline-5-image", value: "/images/breakthrough.jpg", type: "image", label: "Timeline 5 Image" },
  { section: "about", key: "timeline-6-title", value: "The Impact", type: "text", label: "Timeline 6 Title" },
  { section: "about", key: "timeline-6-text", value: "Today, across India, thousands of looms carry his impact quietly.", type: "text", label: "Timeline 6 Text" },
  { section: "about", key: "timeline-6-image", value: "/images/impact.jpg", type: "image", label: "Timeline 6 Image" },
  { section: "about", key: "guidance-image", value: "/images/Rectangle 5.jpg", type: "image", label: "Guidance Profile Image" },
  { section: "about", key: "guidance-heading", value: "The Guidance Force", type: "text", label: "Guidance Heading" },
  { section: "about", key: "guidance-text-1", value: "Guiding him through this journey was the constant mentorship of Brigadier P. Ganesham, associated with Palle Srujana.", type: "text", label: "Guidance Text 1" },
  { section: "about", key: "guidance-text-2", value: "Through his support and direction, Sivakumar found clarity in moments of doubt.", type: "text", label: "Guidance Text 2" },
  { section: "about", key: "guidance-text-3", value: "With continued support from organizations like National Innovation Foundation and Telangana Innovation Cell, the impact only grew stronger.", type: "text", label: "Guidance Text 3" },
  { section: "about", key: "partner-logo-1", value: "/images/nif.jpg", type: "image", label: "Partner Logo 1" },
  { section: "about", key: "partner-logo-2", value: "/images/tgic.jpg", type: "image", label: "Partner Logo 2" },
  { section: "about", key: "partner-logo-3", value: "/images/telugu.jpg", type: "image", label: "Partner Logo 3" },
  { section: "about", key: "vision-heading", value: "The Vision", type: "text", label: "Vision Heading" },
  { section: "about", key: "vision-text", value: "To empower every handloom weaver by making weaving comfortable, sustainable, and accessible without losing its traditional essence.", type: "text", label: "Vision Text" },
  { section: "about", key: "mission-heading", value: "The Mission", type: "text", label: "Mission Heading" },
  { section: "about", key: "mission-text", value: "To design simple, affordable, and practical innovations that reduce physical strain, improve efficiency, and enhance the livelihoods of weavers across communities.", type: "text", label: "Mission Text" },
  { section: "contact", key: "heading", value: "How can we help?", type: "text", label: "Contact Heading" },
  { section: "contact", key: "phone", value: "+91 81438 24009", type: "text", label: "Contact Phone Number" },
  { section: "contact", key: "contact-subtext", value: "Contact us", type: "text", label: "Contact Subtext" },
  { section: "contact", key: "address", value: "Hyderabad, Telangana", type: "text", label: "Address" },
  { section: "contact", key: "whatsapp-icon", value: "/images/chat.jpg", type: "image", label: "WhatsApp Icon" },
  { section: "contact", key: "whatsapp-text", value: "Message on whatsapp", type: "text", label: "WhatsApp Text" },
  { section: "contact", key: "divider-or", value: "or", type: "text", label: "Divider Or" },
  { section: "contact", key: "enquiry-heading", value: "Enquiry Form", type: "text", label: "Enquiry Heading" },
  { section: "contact", key: "form-name-placeholder", value: "Full Name", type: "text", label: "Form Name Placeholder" },
  { section: "contact", key: "form-city-placeholder", value: "City", type: "text", label: "Form City Placeholder" },
  { section: "contact", key: "form-problem-placeholder", value: "Problem", type: "text", label: "Form Problem Placeholder" },
  { section: "contact", key: "error-name", value: "Please enter your name", type: "text", label: "Error: Name" },
  { section: "contact", key: "error-city", value: "Please enter your city", type: "text", label: "Error: City" },
  { section: "contact", key: "error-problem", value: "Please describe your problem", type: "text", label: "Error: Problem" },
  { section: "contact", key: "submit-text", value: "Submit", type: "text", label: "Submit Button" },
  { section: "contact", key: "thank-you-text", value: "Thank you! We'll contact you soon.", type: "text", label: "Thank You Text" },
  { section: "header", key: "logo-image", value: "/images/proper logo.jpg", type: "image", label: "Header Logo" },
  { section: "header", key: "language-image", value: "/images/english.jpg", type: "image", label: "Language Selector Icon" },
  { section: "header", key: "nav-home", value: "Home", type: "text", label: "Nav: Home" },
  { section: "header", key: "nav-product", value: "Product", type: "text", label: "Nav: Product" },
  { section: "header", key: "nav-innovations", value: "Innovations", type: "text", label: "Nav: Innovations" },
  { section: "header", key: "nav-our-story", value: "Our Story", type: "text", label: "Nav: Our Story" },
  { section: "header", key: "nav-contact", value: "Contact Us", type: "text", label: "Nav: Contact Us" },
  { section: "footer", key: "contact-heading", value: "Contact", type: "text", label: "Footer Contact Heading" },
  { section: "footer", key: "phone", value: "+91 81438 24009", type: "text", label: "Footer Phone" },
  { section: "footer", key: "copyright", value: "© 2024 Modha Technologies. All rights reserved.", type: "text", label: "Copyright" },
  { section: "footer", key: "find-us-heading", value: "Find Us", type: "text", label: "Find Us Heading" },
  { section: "footer", key: "map-image", value: "/images/exact.jpg", type: "image", label: "Map Image" },
  { section: "global", key: "whatsapp-icon", value: "/images/Group 58.jpg", type: "image", label: "WhatsApp Floating Icon" },
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

app.use("/api/admin", adminRoutes);

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
