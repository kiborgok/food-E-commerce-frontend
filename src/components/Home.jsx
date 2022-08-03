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
    <Products
      products={products}
      onAddToCart={onAddToCart}
      cartItems={cartItems}
      onMouseOut={onMouseOut}
      onMouseIn={onMouseIn}
      onRemoveFromCart={onRemoveFromCart}
    />
  );
}
