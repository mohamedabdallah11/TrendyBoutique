import React, { useState } from "react";
import "./App.css";

const productsData = [
  {
    id: 1,
    name: "Jacket black jeans",
    category: "jacket",
    price: 49.99,
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue", "Green"],
    image: "/images/anna-evans-jTC6ej2PkKs-unsplash.jpg",
    recommended: [2, 4]
  },
  {
    id: 2,
    name: "white basic t-shirt",
    category: "t shirts",
    price: 89.99,
    sizes: ["M", "L"],
    colors: ["Blue", "Black"],
    image: "/images/junko-nakase-Q-72wa9-7Dg-unsplash.jpg",
    recommended: [1, 3]
  },
  {
    id: 3,
    name: "Cotton shits",
    category: "under shirts",
    price: 19.99,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    image: "/images/kai-pilger-7YwWjgS7aJs-unsplash.jpg",
    recommended: [1]
  },
  {
    id: 4,
    name: "Pleated t shirt",
    category: "t shirts",
    price: 39.99,
    sizes: ["S", "M"],
    colors: ["Pink", "Navy"],
    image: "/images/masaaki-komori-9ugEeqflo70-unsplash.jpg",
    recommended: [1, 3]
  },
  {
    id: 5,
    name: "classic",
    category: "full outfit",
    price: 59.99,
    sizes: [],
    colors: ["Brown", "Black"],
    image: "images/mnz-ToLMORRb97Q-unsplash.jpg",
    recommended: [2]
  }
];

function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart((prev) => [...prev, product]);

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const checkout = () => alert("Proceeding to checkout!");

  return { cart, addToCart, removeFromCart, checkout };
}

function ProductFilter({ category, setCategory, sortOrder, setSortOrder }) {
  return (
    <div className="filters" style={{ marginBottom: "20px" }}>
      <label>Filter by Category: </label>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="All">All</option>
        <option value="jacket">Jackets</option>
        <option value="t shirts">T-Shirts</option>
        <option value="under shirts">Under Shirts</option>
        <option value="full outfit">Full Outfit</option>
      </select>

      <label style={{ marginLeft: "20px" }}>Sort by Price: </label>
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card" key={product.id}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>${product.price.toFixed(2)}</p>
      <p>Sizes: {product.sizes.join(", ")}</p>
      <p>Colors: {product.colors.join(", ")}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

function CartItem({ item, removeFromCart }) {
  return (
    <div className="cart-item" key={item.id}>
      {item.name} - ${item.price.toFixed(2)}
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
}

function CartSection({ cart, removeFromCart, checkout }) {
  return (
    <div className="cart-section">
      <h2>🛒 Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />)}
          <button className="checkout-btn" onClick={checkout}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

function App() {
  const { cart, addToCart, removeFromCart, checkout } = useCart();
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  const filterProducts = () => {
    let filtered = [...productsData];
    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }
    filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    return filtered;
  };

  const filteredProducts = filterProducts();

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">Fashion Boutique</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="content-wrapper">
        <aside className="sidebar">
          <h2>Categories</h2>
          <ul>
            <li>Dresses</li>
            <li>Jackets</li>
            <li>Tops</li>
          </ul>
        </aside>

        <main className="main-content">
          <ProductFilter
            category={category}
            setCategory={setCategory}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <div className="product-list">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>

          <CartSection cart={cart} removeFromCart={removeFromCart} checkout={checkout} />
        </main>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Fashion Boutique. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
