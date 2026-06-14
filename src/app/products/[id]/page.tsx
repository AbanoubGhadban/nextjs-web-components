import { getProduct, getProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/client/AddToCartButton";

export function generateStaticParams() {
  return getProducts().map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) notFound();

  const stockVariant =
    product.stock > 50 ? "success" : product.stock > 20 ? "warning" : "danger";

  return (
    <div className="max-w-4xl space-y-8">
      <Link
        href="/products"
        className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image */}
        <app-card variant="default">
          <div className="text-center py-12">
            <span className="text-9xl">{product.image}</span>
          </div>
        </app-card>

        {/* Product info - Server rendered with web components */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <app-badge variant="primary">{product.category}</app-badge>
              <app-badge variant={stockVariant}>
                {product.stock} in stock
              </app-badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price}
            </span>
            <app-badge variant="success" size="lg">
              ⭐ {product.rating}
            </app-badge>
          </div>

          <app-progress
            value={String(product.stock)}
            max="200"
            label="Stock Level"
            variant={stockVariant}
          />

          {/* Client component for interactivity */}
          <AddToCartButton productName={product.name} price={product.price} />
        </div>
      </div>

      {/* Product details accordion - Server rendered */}
      <app-card>
        <div slot="header">
          <h2 className="text-lg font-semibold">Product Details</h2>
        </div>
        <app-accordion
          items={JSON.stringify([
            {
              id: "desc",
              title: "Description",
              content: product.description,
            },
            {
              id: "specs",
              title: "Specifications",
              content: `Category: ${product.category} | Rating: ${product.rating}/5 | Stock: ${product.stock} units`,
            },
            {
              id: "shipping",
              title: "Shipping & Returns",
              content:
                "Free shipping on orders over $50. 30-day return policy with full refund. Express shipping available for $9.99.",
            },
          ])}
        />
      </app-card>
    </div>
  );
}
