import React from "react";

export default function Product({
  product,
  onAddToCart,
  cartItems,
  onMouseOut,
  onMouseIn,
  onRemoveFromCart,
}) {
  function containsProduct(prod, cartList) {
    let i;
    for (i = 0; i < cartList.length; i++) {
      if (cartList[i].id === prod.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div className="relative">
      <div
        key={product.id}
        // Problem with class "absolute" in column
        className={
          product.active ? "border p-3 rounded-lg shadow absolute" : "relative"
        }
        onMouseEnter={() => onMouseIn(product.id)}
        onMouseLeave={() => onMouseOut(product.id)}
      >
        <dt>
          <p className="ml-20 p-1 text-lg leading-6 font-medium">
            {product.name}
          </p>
          <div className="absolute h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              src={product.imageSrc}
              className="h-full w-full object-cover object-center"
              aria-hidden="true"
              alt={product.name}
            />
          </div>
          <p className="ml-20 p-1 text-lg leading-6 text-red-500">
            Ksh. {product.price}
          </p>
        </dt>
        <dd className="ml-20 p-1 text-base text-gray-500">
          {product.description}
        </dd>
        <dd
          className={
            product.active
              ? "mt-2 ml-16 text-base text-gray-500"
              : "hidden mt-2 ml-16 text-base text-gray-500"
          }
        >
          {!containsProduct(product, cartItems) ? (
            <button
              class="flex items-center px-24 py-2 text-red-500 text-lg outline outline-red-500 rounded-full hover:outline-4"
              onClick={() => onAddToCart(product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2 text-red"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Add To cart</span>
            </button>
          ) : (
            <button
              class="flex items-center px-24 py-2 text-red-500 text-lg outline outline-red-500 rounded-full hover:outline-4"
              onClick={() => onRemoveFromCart(product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2 text-red"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Remove From cart</span>
            </button>
          )}
        </dd>

        <div
          className={
            product.active ? "" : "border-3 shadow border mt-6 border-gray-200"
          }
        />
      </div>
    </div>
  );
}
