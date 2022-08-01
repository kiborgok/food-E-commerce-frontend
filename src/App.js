import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import React, { useEffect, useState } from "react";
import ShoppingCart from "./components/ShoppingCart";

import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline";

const features = [
  {
    id: 1,
    name: "Beef stew with 2 chapatis",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
    active: false,
    price: 150,
    imageSrc: require("./images/chapati.jpg"),
  },
  {
    id: 2,
    name: "Beans stew with 2 chapatis",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
    active: false,
    price: 120,
    imageSrc: require("./images/chapo-beans.jpg"),
  },
  {
    id: 3,
    name: "Fried nyama with ugali",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LightningBoltIcon,
    active: false,
    price: 120,
    imageSrc: require("./images/ugali-nyama.jpeg"),
  },
  {
    id: 4,
    name: "1/4 fried chicken with rice",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: AnnotationIcon,
    active: false,
    price: 180,
    imageSrc: require("./images/chicken-rice.jpg"),
  },
];
const items = [
  {
    id: 1,
    name: "Beans stew with 2 chapatis",
    price: 90,
    quantity: 1,
    imageSrc: require("./images/chapo-beans.jpg"),
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Fried nyama with ugali",
    price: 32,
    quantity: 1,
    imageSrc: require("./images/ugali-nyama.jpeg"),
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

function App() {
  const [products, setProducts] = useState(features);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setToggle] = useState(false);
  const [cartItems, setCartItems] = useState(items);

  function handleCartAdd(cartItem) {
    setCartItems([...cartItems,
      { ...cartItem, quantity: 1, imageAlt: cartItem.name },
    ]);
  }

  function handleCartRemove(cartItem) {
    setCartItems(cartItems.filter((item) => item.id !== cartItem.id));
  }

  function handleTotalPriceChange(cartItems) {
    setTotalPrice(
      cartItems
        .map((item) => item.price)
        .reduce((initialValue, currentValue) => initialValue + currentValue, 0)
    );
  }

  useEffect(() => handleTotalPriceChange(cartItems), [cartItems]);

  function handleMouseOut(id) {
    setProducts((products) =>
      products.map((product) => {
        if (product.id === id) {
          return { ...product, active: !product.active };
        } else {
          return product;
        }
      })
    );
  }

  function handleMouseIn(id) {
    setProducts((products) =>
      products.map((product) => {
        if (product.id === id) {
          return { ...product, active: !product.active };
        } else {
          return product;
        }
      })
    );
  }
  return (
    <>
      <NavBar
        items={cartItems}
        onCartToggle={setToggle}
        totalPrice={totalPrice}
        onPriceChange={handleTotalPriceChange}
      />
      <ShoppingCart
        cartItems={cartItems}
        cart={cart}
        onCartToggle={setToggle}
        totalPrice={totalPrice}
        onRemoveFromCart={handleCartRemove}
      />
      <Home
        products={products}
        onMouseOut={handleMouseOut}
        onMouseIn={handleMouseIn}
        onAddToCart={handleCartAdd}
        cartItems={cartItems}
        onRemoveFromCart={handleCartRemove}
      />
    </>
  );
}

export default App;
