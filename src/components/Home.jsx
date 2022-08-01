import Products from "./Products";


export default function Home({
  products,
  onAddToCart,
  cartItems,
  onMouseOut,
  onMouseIn,
  onRemoveFromCart,
}) {
  return (
    <>
      <div className="min-h-full">
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Products
              products={products}
              onAddToCart={onAddToCart}
              cartItems={cartItems}
              onMouseOut={onMouseOut}
              onMouseIn={onMouseIn}
              onRemoveFromCart={onRemoveFromCart}
            />
          </div>
        </main>
      </div>
    </>
  );
}
