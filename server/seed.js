import dotenv from "dotenv";
import mongoose from "mongoose";

import Innovation from "./models/Innovation.js";
import Product from "./models/Product.js";
import Review from "./models/Review.js";

dotenv.config();

const products = [
  {
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

const innovations = [
  {
    title: "Modha Jacquard Machine",
    description:
      "Modha Jacquard Machine is designed to improve the efficiency and precision of traditional handloom weaving. It upgrades the existing jacquard system with a digital mechanism, replacing manual punch cards with an easy-to-use USB-based design process. This reduces the time, effort, and complexity involved in creating intricate patterns, making weaving faster while still maintaining the traditional setup.",
    status: "pending",
    image: "/images/innovation-jacquard.jpg",
  },
  {
    title: "Modha Pedal Operation Machine",
    description:
      "Modha Pedal Operation Machine is designed to improve the comfort and efficiency of traditional handloom weaving. It upgrades the existing pedal system with a smoother and more responsive mechanism, reducing the physical effort required by the weaver. This makes the weaving process easier, less tiring, and more productive while still maintaining the traditional setup.",
    status: "pending",
    image: "/images/innovation-pedal.jpg",
  },
];

const reviews = [
  {
    quote:
      "It has been really good. I've been using it for 6 months, and it was easy to set up without any tutorial. It fits well into my workflow and has made the process simpler and more comfortable.",
    author: "Weaver",
    product: "Modha Pedal Operating Machine",
  },
  {
    quote:
      "I've been using this for 3 years and it's been very effective. We installed it ourselves using the YouTube video. Only a minor repair was needed once, which we fixed easily with guidance. My leg pain is gone, and work feels much more comfortable.",
    author: "Weaver",
    product: "Modha Pedal Operating Machine",
  },
  {
    quote:
      "It has been really good. After I became disabled, Sivakumar Modha personally helped by making a machine for me. It's been 3 years with no repairs, and it has given me a way to live independently again. He has also supported around 150 members in Jangam Jilla.",
    author: "Artisan, Jangam Jilla",
    product: "Modha Pedal Operating Machine",
  },
  {
    quote:
      "It has been really good. After I became disabled, Sivakumar Modha personally made a machine for me, and it's been 3 years with no repairs. It has helped me live independently again, and he has supported around 150 members in Jangam Jilla.",
    author: "Artisan",
    product: "Modha Pedal Operating Machine",
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/modha-technologies";
  await mongoose.connect(uri);

  await Product.deleteMany({});
  await Innovation.deleteMany({});
  await Review.deleteMany({});

  await Product.insertMany(products);
  await Innovation.insertMany(innovations);
  await Review.insertMany(reviews);

  console.log("Database seeded successfully");
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
