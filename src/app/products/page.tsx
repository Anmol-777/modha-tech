import ProductPageContent from "@/components/ProductPageContent";
import { siteConfig } from "@/data/content";
import { getProduct, getReviews } from "@/lib/api";

export async function generateMetadata() {
  const product = await getProduct(siteConfig.fallbackProduct.slug);
  return {
    title: product?.name || "Products",
    description: product?.shortDescription,
  };
}

export default async function ProductsPage() {
  const product = await getProduct(siteConfig.fallbackProduct.slug);
  const reviews = await getReviews();

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p>Product not found.</p>
      </div>
    );
  }

  return <ProductPageContent product={product} reviews={reviews} />;
}
