import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import ShoppingCart from "./components/ShoppingCart";

import { useToken } from "./hooks/useToken";
import jwt from "jwt-decode";

import Signup from "./components/Signup";
import Main from "./components/Main";
import Signin from "./components/Signin";
import Checkout from "./components/Checkout";
import { loadUser } from "./api/auth";
import Order from "./components/Order";
import Admin from "./components/admin/Admin";
import { getProducts } from "./api/product";

function App() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setToggle] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
    amount: totalPrice,
  });

  async function fetchProducts() {
    let data = await getProducts();
    data = data.map(product => ({...product, active: false}))
    setProducts([...products, ...data]);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const [token] = useToken();

  const getUser = (token) => {
    return jwt(token);
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getUser(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getUser(token));
    }
  }, [token]);

  useEffect(() => {
    loadUser(token).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, [token]);

  function handleCartAdd(cartItem) {
    setCartItems([
      ...cartItems,
      {
        id: cartItem.id,
        name: cartItem.name,
        price: cartItem.price,
        quantity: 1,
        imageSrc: cartItem.imageSrc,
        imageAlt: cartItem.name,
      },
    ]);
  }

  function handleCartRemove(cartItem) {
    setCartItems(cartItems.filter((item) => item.id !== cartItem.id));
  }

  function handleTotalPriceChange(cartItems) {
    setTotalPrice(
      cartItems
        .map((item) => item.price * item.quantity)
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
  function handleIncrement(cartProduct) {
    setCartItems(
      cartItems.map((product) =>
        product.id === cartProduct.id
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product
      )
    );
  }
  function handleDecrement(cartProduct) {
    setCartItems(
      cartItems.map((product) =>
        product.id === cartProduct.id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  }

  function handleInfoChange(e) {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  }
  return (
    <>
      <NavBar
        setUser={setUser}
        user={user}
        items={cartItems}
        onCartToggle={setToggle}
        totalPrice={totalPrice}
        onPriceChange={handleTotalPriceChange}
      />
      <ShoppingCart
        user={user}
        cartItems={cartItems}
        cart={cart}
        onCartToggle={setToggle}
        totalPrice={totalPrice}
        onRemoveFromCart={handleCartRemove}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
      <Main>
        <Routes>
          <Route
            path="/admin/*"
            element={<Admin products={products} setProducts={setProducts} />}
          />
          <Route
            path="/"
            element={
              <Home
                products={products}
                onMouseOut={handleMouseOut}
                onMouseIn={handleMouseIn}
                onAddToCart={handleCartAdd}
                cartItems={cartItems}
                onRemoveFromCart={handleCartRemove}
              />
            }
          />
          <Route
            path="/signin"
            element={<Signin user={user} getUser={getUser} setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={<Signup user={user} getUser={getUser} setUser={setUser} />}
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                user={user}
                order={order}
                handleInfoChange={handleInfoChange}
                cartItems={cartItems}
                cart={cart}
                onCartToggle={setToggle}
                totalPrice={totalPrice}
                onRemoveFromCart={handleCartRemove}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            }
          />
          <Route
            path="/order"
            element={
              <Order
                user={user}
                order={order}
                handleInfoChange={handleInfoChange}
                cartItems={cartItems}
                cart={cart}
                onCartToggle={setToggle}
                totalPrice={totalPrice}
                onRemoveFromCart={handleCartRemove}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                setCartItems={setCartItems}
              />
            }
          />
        </Routes>
      </Main>
    </>
  );
}

export default App;
