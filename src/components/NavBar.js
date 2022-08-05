import { Fragment } from "react";
import {  NavLink } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ShoppingBagIcon,
  MenuIcon,
  XIcon,
  UserIcon,
} from "@heroicons/react/outline";

const user1 = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Admin", to: "/admin", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ user,setUser, items, onCartToggle, totalPrice }) {
  let userNavigation = [
    { name: "Signin", to: "/signin" },
    { name: "Signup", to: "/signup" },
  ];
  if (user) {
    userNavigation = [
      { name: "LogOut", to: "/" },
    ];
  }
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-around h-20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="border-3 shadow border border-red-500" />
                  <h2 className="flex items-center text-lg text-red-500 font-semibold tracking-wide uppercase">
                    <span className="text-5xl">M</span>
                    <span>athe</span>
                    <span className="text-4xl">F</span>ood
                  </h2>
                  <div className="border-3 shadow border border-red-500" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-center space-x-6">
                    {navigation.map((item) => (
                      !user && item.name === "Admin" ? null : <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "underline text-red-400"
                              : "text-red-600 hover:underline hover:text-red-400",
                            "px-3 py-2 text-lg font-medium"
                          )
                        }
                        aria-current={({ isActive }) =>
                          isActive ? "page" : undefined
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs rounded-full flex items-center text-sm">
                        <span className="sr-only">Open user menu</span>
                        <UserIcon className="h-8 w-8" alt="" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <NavLink
                                onClick={() => {
                                  localStorage.removeItem("token")
                                  setUser(null)
                                }}
                                to={item.to}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-red-600"
                                )}
                              >
                                {item.name}
                              </NavLink>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <button
                    onClick={() => onCartToggle(true)}
                    type="button"
                    className="relative p-1 rounded-full text-red-500 hover:text-red-600 focus:outline-none"
                  >
                    <span className="sr-only">View Cart</span>
                    <span className="absolute top-4 right-4 left-4 text-black font-bold text-sm">
                      {items.length}
                    </span>
                    <ShoppingBagIcon className="h-9 w-9" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => onCartToggle(true)}
                    class="flex items-center px-1 py-1 text-gray-700 text-sm outline outline-red-500 rounded-full hover:outline-4"
                  >
                    <span>Ksh. {totalPrice}.00</span>
                  </button>
                </div>
              </div>
              {user ? null : (
                <button class="flex items-center px-1 py-1 text-gay-700 text-sm outline outline-gay-700 rounded-md hover:outline-4">
                  <NavLink to="signin">Signin/Signup</NavLink>
                </button>
              )}
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.to}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <UserIcon className="h-10 w-10 rounded-full" alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user1.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user1.email}
                  </div>
                </div>
                <button
                  onClick={() => onCartToggle(true)}
                  type="button"
                  className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View Cart</span>
                  <ShoppingBagIcon className="h-8 w-8" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="NavLink"
                    to={item.to}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
