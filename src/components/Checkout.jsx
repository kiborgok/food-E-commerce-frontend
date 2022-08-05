import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Checkout({
  user,
  cartItems,
  cart,
  onCartToggle,
  totalPrice,
  onRemoveFromCart,
  onDecrement,
  onIncrement,
  handleInfoChange,
  order,
}) {
  const navigate = useNavigate();
  if(cartItems.length === 0) return navigate("/");
  function handleOrder() {
    if (user) {
      if (order.name === "" || order.email === "" || order.location === "" || order.phone === "") {
        return alert("Please fill in all fields")
      }
      if (order.phone.length > 10 || order.phone.length < 10) {
        return alert("Invalid phone number: "+ order.phone)
      }
        return navigate("/order");
    } else {
      return navigate("/signin");
    }
  }
  return (
    <div className="flex justify-between">
      <div class="leading-loose">
        <form class="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
          <p class="text-gray-800 font-medium">Customer information</p>
          <div class="">
            <label class="block text-sm text-gray-0" for="name">
              Full name
            </label>
            <input
              class="w-full px-5 py-1 text-gray-700 bg-white rounded"
              id="name"
              name="name"
              type="text"
              required=""
              placeholder="Full name"
              aria-label="Name"
              value={order.name}
              onChange={handleInfoChange}
            />
          </div>
          <div class="mt-2">
            <label class="block text-sm text-gray-0" for="email">
              Email
            </label>
            <input
              class="w-full px-5  py-4 text-gray-700 bg-white rounded"
              id="email"
              name="email"
              type="text"
              required=""
              placeholder="Your Email"
              aria-label="Email"
              value={order.email}
              onChange={handleInfoChange}
            />
          </div>
          <div class="mt-2">
            <label class=" block text-sm text-gray-0" for="cus_email">
              Address
            </label>
            <input
              class="w-full px-2 py-2 text-gray-700 bg-white rounded"
              id="location"
              name="location"
              type="text"
              required=""
              placeholder="Location"
              aria-label="Email"
              value={order.location}
              onChange={handleInfoChange}
            />
          </div>
          <div className="mt-2">
            <input
              class="w-full px-2 py-2 text-gray-700 bg-white rounded"
              id="phone"
              name="phone"
              type="number"
              required=""
              placeholder="Example: 0712345678"
              aria-label="Phone"
              value={order.phone}
              onChange={handleInfoChange}
            />
          </div>
        </form>
      </div>
      <div class="leading-loose">
        <div className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
          {cartItems.length !== 0 ? (
            <div className="mt-8">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  <h2>Order Summary</h2>
                  {cartItems.map((product) => (
                    <>
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}> {product.name} </a>
                              </h3>
                              <p className="ml-4">
                                Ksh. {product.price * product.quantity}.00
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              <button
                                onClick={() => onDecrement(product)}
                                className={
                                  product.quantity === 1
                                    ? "bg-gray-300 p-2 m-2 rounded-full cursor-pointer"
                                    : "bg-yellow-300 p-2 m-2 rounded-full cursor-pointer"
                                }
                                disabled={product.quantity === 1}
                              >
                                -
                              </button>{" "}
                              {product.quantity}
                              <span
                                onClick={() => onIncrement(product)}
                                className="bg-yellow-300 p-2 m-2 rounded-full cursor-pointer"
                              >
                                +
                              </span>
                            </p>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500"
                                onClick={() => onRemoveFromCart(product)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mx-6 my-6 h-3/5">
              <div className="text-red-600 my-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-40 h-40 mr-2 text-red my-3"
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
              </div>
              <h2 className="my-3">Your Cart is empty!</h2>
              <button
                class="flex items-center px-20 py-2 text-red-500 my-3 text-lg outline outline-red-500 rounded-full hover:outline-4"
                // onClick={() => onAddToCart(product)}
              >
                <span>Go Shopping</span>
              </button>
            </div>
          )}
          {cartItems.length !== 0 ? (
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Shipping</p>
                <p>Ksh. 30.00</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Ksh. {totalPrice + 30}.00</p>
              </div>
              <div className="mt-6" onClick={() => handleOrder()}>
                <button className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700">
                  Confirm Order
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    <NavLink to="/">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </NavLink>
                  </button>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
