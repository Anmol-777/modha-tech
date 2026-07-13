import { siteConfig, type Innovation, type Product, type Review } from "@/data/content";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getReviews(): Promise<Review[]> {
  const data = await fetchJson<Review[]>("/api/reviews");
  return data?.length ? data : siteConfig.fallbackReviews;
}

export async function getInnovations(status?: string): Promise<Innovation[]> {
  const query = status && status !== "all" ? `?status=${status}` : "";
  const data = await fetchJson<Innovation[]>(`/api/innovations${query}`);
  return data?.length ? data : siteConfig.fallbackInnovations;
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchJson<Product[]>("/api/products");
  return data?.length ? data : [siteConfig.fallbackProduct];
}

export async function getProduct(slug: string): Promise<Product | null> {
  const data = await fetchJson<Product>(`/api/products/${slug}`);
  if (data) return data;
  return slug === siteConfig.fallbackProduct.slug ? siteConfig.fallbackProduct : null;
}

export async function submitContact(form: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to submit" }));
    throw new Error(error.message || "Failed to submit enquiry");
  }

  return res.json();
}
