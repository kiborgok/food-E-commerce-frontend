import Product from "./Product";

export default function Products({
  products,
  onAddToCart,
  cartItems,
  onMouseOut,
  onMouseIn,
  onRemoveFromCart,
}) {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Product
          </h2>
        </div> */}

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-14">
            {products.map((product) => (
              <Product
                product={product}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                onMouseOut={onMouseOut}
                onMouseIn={onMouseIn}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
