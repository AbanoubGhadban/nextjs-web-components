import { getProducts } from "@/lib/data";
import Link from "next/link";
import ProductFilter from "@/components/client/ProductFilter";

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">
          Product catalog with server-fetched data and client-side filtering.
        </p>
      </div>

      <app-alert variant="info" title="Hybrid Rendering">
        Products are fetched server-side. The filter is a Client Component.
        Product cards use web components rendered in both contexts.
      </app-alert>

      <ProductFilter products={products} />

      {/* Server-rendered product grid */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">All Products</h2>
          <app-badge variant="success">Server Rendered</app-badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="block">
              <app-card hoverable>
                <div className="text-center mb-4">
                  <span className="text-5xl">{product.image}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <app-badge
                    variant={product.stock > 50 ? "success" : product.stock > 20 ? "warning" : "danger"}
                    size="sm"
                  >
                    {product.stock} in stock
                  </app-badge>
                </div>
                <div slot="footer">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>⭐ {product.rating}</span>
                    <span>•</span>
                    <span>{product.category}</span>
                  </div>
                </div>
              </app-card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
