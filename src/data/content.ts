export type Review = {
  _id: string;
  quote: string;
  author?: string;
  product?: string;
};

export type Innovation = {
  _id: string;
  title: string;
  description: string;
  status: "patented" | "pending";
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  features?: string[];
  dimensions?: string;
  rating?: number;
  image?: string;
};

export const siteConfig = {
  name: "Modha Technologies",
  tagline: "Innovations for handloom weavers",
  description:
    "Modha Technologies designs simple, affordable innovations that reduce physical strain and improve efficiency for handloom weavers across India.",
  nav: [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Innovations", href: "/innovations" },
  ],
  contact: {
    email: "info@modhatechnologies.com",
    phone: "+91 98765 43210",
    address: "Hyderabad, Telangana, India",
  },
  heroProduct: {
    name: "Modha Pedal Operating Machine",
    cta: "Buy Now",
    href: "/products",
  },
  features: {
    title: "Features",
    centerLabel: "Modha Pedal Operating Machine",
    left: ["Smooth pedal movement", "Less effort while weaving"],
    right: ["Faster work output", "Long-lasting build"],
  },
  aboutStory: {
    title: "Modha Technologies",
    paragraphs: [
      "It began with a simple question.",
      "In a small weaving village near Hindupuram, Sivakumar Modha sat beside a loom and quietly watched a weaver at work. Thousands of punch cards controlled every design, expensive, fragile, and painfully slow. When he asked if there was a better way, the weaver replied, \"If it comes, our lives will change.\" That answer stayed with him.",
      "Because what he witnessed was not just a process, but a life shaped by effort and endurance. In rural India, handloom is more than a profession, it is identity, tradition, survival. Yet behind every saree lies unseen strain. Every day, weavers lift heavy weights with their legs thousands of times, slowly wearing down their knees and back. Over time, pain replaces skill, and many are forced to leave the craft they grew up with, often with no other way to earn.",
      "For most, this was simply how life was. For Sivakumar, it became a question he could not ignore. Can the pain be removed without taking away the craft itself?",
      "Born to a school watchman and a school aide, he was expected to follow a stable path. He studied, cleared ICET, and began preparing for an MCA. A secure future was within reach. But that one question changed everything. Against his father's wishes, he walked away and stepped into the unfamiliar world of looms. He was not a weaver, but he chose to understand their world, spending years observing, learning, and listening. What began as curiosity slowly became purpose.",
      "Then life tested him. He lost his father. He faced ridicule. With just ₹2000, he left home, promising his mother he would return only after he succeeded. Years passed without seeing his family, but he kept going, holding on to one belief, if he could solve this, he could change lives.",
      "The journey was long and uncertain. Many ideas failed. Early models did not work. The challenge was not just innovation, but creating something simple, affordable, and practical for real weavers. So he kept going back to them, improving step by step, shaped by their needs and realities.",
      "Slowly, change began to take form. In Hyderabad, through years of persistence, he built an electronic jacquard system that removed the need for punch cards, reducing cost and giving weavers more freedom to create. But he knew the deeper problem still remained, the pain. And so he continued.",
    ],
    machineIntro: [
      "After years of effort, the Modha Pedal Operating Machine came to life. A system that transfers the physical burden from the weaver's body to a motor, without changing the traditional loom or the essence of the craft.",
      "What changed was not just the process, but people's lives. Elderly weavers returned to their looms. Women could continue their work without constant strain.",
    ],
    closing: [
      "Even physically challenged artisans found a way back to weaving and supporting themselves. For many, it was more than relief. It was dignity restored, independence regained, and hope returned.",
      "Behind this journey was silent strength, his mother's belief and his wife's sacrifice. Jayanthi Sree stood beside him through years of uncertainty, putting her own dreams on hold so he could survive. When he was offered crores for his invention, he refused. Because this was never about money. It was about people.",
      "Guiding him through this journey was the constant mentorship of Brigadier P. Ganesham, associated with Palle Srujana. More than a mentor, he became a guiding force and a source of unwavering belief. Through his support and direction, Sivakumar found clarity in moments of doubt and strength in moments of struggle. The encouragement and ecosystem provided by Palle Srujana played a crucial role in shaping this journey, standing as a pillar behind grassroots innovators who dare to solve real problems.",
      "With continued support from organizations like National Innovation Foundation and Telangana Innovation Cell, the impact only grew stronger.",
      "Today, across India, thousands of looms carry his impact quietly, in every thread woven without pain, in every artisan who no longer has to choose between their health and their livelihood. This is not just an innovation. It is care, built into design. And the journey continues, with one simple purpose, to make sure no weaver has to give up their craft just to survive.",
    ],
    vision:
      "To empower every handloom weaver by making weaving comfortable, sustainable, and accessible without losing its traditional essence.",
    mission:
      "To design simple, affordable, and practical innovations that reduce physical strain, improve efficiency, and enhance the livelihoods of weavers across communities.",
  },
  fallbackReviews: [
    {
      _id: "1",
      quote:
        "It has been really good. I've been using it for 6 months, and it was easy to set up without any tutorial. It fits well into my workflow and has made the process simpler and more comfortable.",
      author: "Weaver",
      product: "Modha Pedal Operating Machine",
    },
    {
      _id: "2",
      quote:
        "I've been using this for 3 years and it's been very effective. We installed it ourselves using the YouTube video. Only a minor repair was needed once, which we fixed easily with guidance. My leg pain is gone, and work feels much more comfortable.",
      author: "Weaver",
      product: "Modha Pedal Operating Machine",
    },
    {
      _id: "3",
      quote:
        "It has been really good. After I became disabled, Sivakumar Modha personally helped by making a machine for me. It's been 3 years with no repairs, and it has given me a way to live independently again. He has also supported around 150 members in Jangam Jilla.",
      author: "Artisan, Jangam Jilla",
      product: "Modha Pedal Operating Machine",
    },
  ],
  fallbackInnovations: [
    {
      _id: "1",
      title: "Modha Jacquard Machine",
      description:
        "Modha Jacquard Machine is designed to improve the efficiency and precision of traditional handloom weaving. It upgrades the existing jacquard system with a digital mechanism, replacing manual punch cards with an easy-to-use USB-based design process. This reduces the time, effort, and complexity involved in creating intricate patterns, making weaving faster while still maintaining the traditional setup.",
      status: "pending" as const,
      image: "/images/innovation-jacquard.jpg",
    },
    {
      _id: "2",
      title: "Modha Pedal Operation Machine",
      description:
        "Modha Pedal Operation Machine is designed to improve the comfort and efficiency of traditional handloom weaving. It upgrades the existing pedal system with a smoother and more responsive mechanism, reducing the physical effort required by the weaver. This makes the weaving process easier, less tiring, and more productive while still maintaining the traditional setup.",
      status: "pending" as const,
      image: "/images/innovation-pedal.jpg",
    },
  ] satisfies Innovation[],
  fallbackProduct: {
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
};
