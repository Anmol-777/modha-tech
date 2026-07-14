import mongoose from "mongoose";
import dotenv from "dotenv";
import Content from "./models/Content.js";

dotenv.config();

const initialContent = [
  // Home - Hero
  { section: "home", key: "hero-heading", value: "Modha Technologies", type: "text", label: "Hero Heading" },
  { section: "home", key: "hero-tagline", value: "Empowering the hands that clothe the nation", type: "text", label: "Hero Tagline" },
  { section: "home", key: "hero-cta", value: "Explore the product", type: "text", label: "Hero CTA Button" },
  { section: "home", key: "hero-badge", value: "Modha Pedal", type: "text", label: "Hero Badge" },
  { section: "home", key: "hero-image", value: "/images/machine.jpg", type: "image", label: "Hero Background Image" },

  // Home - Features
  { section: "home", key: "features-heading", value: "Key Features", type: "text", label: "Features Section Heading" },
  { section: "home", key: "features-image", value: "/images/Group 106.jpg", type: "image", label: "Features Image" },

  // Home - Video
  { section: "home", key: "video-heading", value: "Installation Video", type: "text", label: "Video Section Heading" },
  { section: "home", key: "video-thumbnail", value: "/images/Group 9.jpg", type: "image", label: "Video Thumbnail" },

  // Home - Testimonials
  { section: "home", key: "testimonials-heading", value: "Voices From The Loom", type: "text", label: "Testimonials Heading" },

  // Home - Awards
  { section: "home", key: "awards-heading", value: "Awards & Recognition", type: "text", label: "Awards Heading" },
  { section: "home", key: "awards-image-1", value: "/images/Group 134.jpg", type: "image", label: "Award Image 1" },
  { section: "home", key: "awards-image-2", value: "/images/Group 134.jpg", type: "image", label: "Award Image 2" },

  // Product
  { section: "product", key: "name", value: "Modha Pedal Operating Machine", type: "text", label: "Product Name" },
  { section: "product", key: "description", value: "The Modha Pedal Operating Machine is a revolutionary innovation that empowers handloom weavers with efficient, ergonomic operation, significantly reducing physical strain while increasing productivity.", type: "text", label: "Product Description" },
  { section: "product", key: "video-heading", value: "Installation Video", type: "text", label: "Product Video Heading" },
  { section: "product", key: "video-thumbnail", value: "/images/Group 9.jpg", type: "image", label: "Product Video Thumbnail" },

  // Innovations
  { section: "innovations", key: "hero-heading", value: "Beyond The Flagship", type: "text", label: "Innovations Hero Heading" },
  { section: "innovations", key: "hero-image", value: "/images/face.jpg", type: "image", label: "Innovations Hero Image" },

  // About
  { section: "about", key: "hero-heading", value: "A Map of purpose", type: "text", label: "About Hero Heading" },
  { section: "about", key: "hero-image", value: "/images/new face.jpg", type: "image", label: "About Hero Image" },

  // Contact
  { section: "contact", key: "heading", value: "How can we help?", type: "text", label: "Contact Heading" },
  { section: "contact", key: "phone", value: "+91 81438 24009", type: "text", label: "Contact Phone Number" },
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/modha-technologies";
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    for (const item of initialContent) {
      await Content.findOneAndUpdate(
        { section: item.section, key: item.key },
        item,
        { upsert: true, new: true }
      );
    }
    console.log(`Seeded ${initialContent.length} content items`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
