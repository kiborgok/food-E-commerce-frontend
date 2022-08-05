import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Order({
  user,
  cartItems,
  setCartItems,
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
  if (cartItems.length === 0) return navigate("/");
  return (
    <div className="flex justify-center">
      <div class="leading-loose">
        <div className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
          {cartItems.length !== 0 ? (
            <div className="mt-8">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  <h2 className="text-3xl">Order successful</h2>
                  {cartItems.map((product) => (
                    <>
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.imageSrc}
                            alt={product.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex">
                          <div className="flex justify-between items-center text-base font-medium text-gray-900">
                            <h3>
                              <p> {product.name} </p>
                            </h3>
                            <p className="ml-4">
                              Ksh. {product.price * product.quantity}.00
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm"></div>
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
                onClick={() => navigate("/")}
              >
                <span>Go Shopping</span>
              </button>
            </div>
          )}
          {cartItems.length !== 0 ? (
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                <p className="font-bold">Total</p>
                <p>Ksh. {totalPrice}.00</p>
              </div>
              <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                <p className="font-bold">Shipping</p>
                <p>Ksh. 30.00</p>
              </div>

              <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                <p className="font-bold">Subtotal</p>
                <p>Ksh. {totalPrice + 30}.00</p>
              </div>
              <hr className="font-bold" />
              <div className="flex my-2 mt-6 justify-between text-base font-medium text-gray-900">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">Shippind Address</h2>
                  <span>{order.name}</span>
                  <span>{order.location}</span>
                  <span>{order.phone}</span>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">Payment Information</h2>
                  <span>Pay on Delivery</span>
                </div>
              </div>
              <div className="mt-12 flex justify-center text-center text-sm text-gray-500">
                <p>
                  {" "}
                  <button
                    type="button"
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    <NavLink to="/" onClick={() => setCartItems([])}>
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
