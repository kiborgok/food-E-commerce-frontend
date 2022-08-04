/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

export default function ShoppingCart({
  cartItems,
  cart,
  onCartToggle,
  totalPrice,
  onRemoveFromCart,
  onDecrement,
  onIncrement,
}) {
  return (
    <Transition.Root show={cart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCartToggle}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {" "}
                          Shopping cart{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => onCartToggle(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {cartItems.length !== 0 ? (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((product) => (
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
                                          <a href={product.href}>
                                            {" "}
                                            {product.name}{" "}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          Ksh.{" "}
                                          {product.price * product.quantity}.00
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
                                          onClick={() =>
                                            onRemoveFromCart(product)
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
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
                    </div>

                    {cartItems.length !== 0 ? (
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>Ksh. {totalPrice}.00</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <NavLink
                            onClick={() => onCartToggle(!cart)}
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700"
                          >
                            Checkout
                          </NavLink>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-red-600 hover:text-red-500"
                              onClick={() => onCartToggle(!cart)}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
