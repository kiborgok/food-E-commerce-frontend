import Products from "./Products";


export default function Home({ products, onProductHover }) {
  return (
    <>
      <div className="min-h-full">
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Products products={products} onProductHover={onProductHover} />
          </div>
        </main>
      </div>
    </>
  );
}
