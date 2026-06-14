"use client";

import { useState, useRef } from "react";


export default function AddToCartButton({
  productName,
  price,
}: {
  productName: string;
  price: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const toastRef = useRef<HTMLElement & { show: (msg?: string) => void }>(null);

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toastRef.current?.show(
        `Added ${quantity}x ${productName} to cart ($${(price * quantity).toFixed(2)})`
      );
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <app-button
          variant="outline"
          size="sm"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          −
        </app-button>
        <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
        <app-button
          variant="outline"
          size="sm"
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </app-button>
        <span className="text-gray-500">
          Total: ${(price * quantity).toFixed(2)}
        </span>
      </div>

      <div className="flex gap-3">
        <app-button
          variant="primary"
          size="lg"
          loading={loading || undefined}
          onClick={handleAddToCart}
        >
          Add to Cart
        </app-button>
        <app-button variant="outline" size="lg">
          ♥ Wishlist
        </app-button>
      </div>

      <app-toast
        ref={toastRef}
        message=""
        variant="success"
        duration="3000"
      />
    </div>
  );
}
