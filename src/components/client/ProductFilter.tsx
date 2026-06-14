"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";


export default function ProductFilter({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchSearch =
      !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Filter Products
        </h2>
        <app-badge variant="primary">Client Component</app-badge>
      </div>

      <app-card>
        <div className="space-y-4">
          <app-search-input
            placeholder="Search products..."
            onInput={(e: React.FormEvent<HTMLElement>) => {
              const detail = (e as unknown as CustomEvent).detail;
              if (detail) setSearch(detail.value);
            }}
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <app-button
                key={cat}
                variant={category === cat ? "primary" : "outline"}
                size="sm"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </app-button>
            ))}
          </div>

          {search || category !== "All" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <app-card key={product.id} hoverable>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{product.image}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {product.name}
                        </h4>
                        <p className="text-blue-600 font-bold">
                          ${product.price}
                        </p>
                        <app-badge
                          variant={
                            product.stock > 50
                              ? "success"
                              : product.stock > 20
                                ? "warning"
                                : "danger"
                          }
                          size="sm"
                        >
                          {product.stock} left
                        </app-badge>
                      </div>
                    </div>
                  </app-card>
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center py-8">
                  No products match your criteria.
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              Use the search or category filters to see filtered results here.
            </p>
          )}
        </div>
      </app-card>
    </section>
  );
}
