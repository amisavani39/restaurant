import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { user } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchCart = async () => {
    if (user && user._id) {
      try {
        const response = await fetch(`${API_URL}/api/cart/${user._id}`);
        const data = await response.json();
        const items = data?.items || [];
        setCartItems(items);
        // Calculate total quantity as cart count - ensure Number() to avoid string concatenation
        const count = items.reduce((total, item) => total + Number(item.quantity || 0), 0);
        setCartCount(count);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (item) => {
    if (!user) {
      alert("Please login to add to cart");
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          product: {
            productId: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
          },
        }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart after adding
        return true;
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Failed to add to cart");
        return false;
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Error adding to cart");
      return false;
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  const removeFromCart = async (productId) => {
    if (!user || !productId) return;
    
    // Get reliable string ID for the product
    const targetId = typeof productId === 'object' ? productId._id : productId;
    
    // Optimistic update
    const previousItems = [...cartItems];
    const previousCount = cartCount;
    
    // Find the item to remove for count calculation
    const itemToRemove = cartItems.find(item => {
      const itemProdId = item.productId?._id || item.productId;
      return itemProdId === targetId || item._id === targetId;
    });

    if (!itemToRemove) {
      console.warn("Item not found in cart state, but attempting to remove from backend");
    }

    // Update local state immediately
    setCartItems(prevItems => prevItems.filter(item => {
      const itemProdId = item.productId?._id || item.productId;
      return itemProdId !== targetId && item._id !== targetId;
    }));
    
    if (itemToRemove) {
      setCartCount(prev => Math.max(0, prev - Number(itemToRemove.quantity || 0)));
    }

    try {
      // Some backends might expect DELETE with body, others with URL params.
      // We'll try the current one first but ensure headers are correct.
      const response = await fetch(`${API_URL}/api/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userId: user._id, 
          productId: targetId 
        }),
      });
      
      if (response.ok) {
        // Success - optionally re-fetch to be absolutely sure
        await fetchCart();
      } else {
        // Rollback on failure
        setCartItems(previousItems);
        setCartCount(previousCount);
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Failed to remove item from cart");
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
      // Rollback on network error
      setCartItems(previousItems);
      setCartCount(previousCount);
      alert("Error removing from cart. Please check your connection.");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user || !productId || quantity < 1) return;
    
    const targetId = typeof productId === 'object' ? productId._id : productId;
    
    // Optimistic update
    const previousItems = [...cartItems];
    const previousCount = cartCount;

    setCartItems(prevItems => {
      const newItems = prevItems.map(item => {
        const itemProdId = item.productId?._id || item.productId;
        if (itemProdId === targetId || item._id === targetId) {
          return { ...item, quantity: Number(quantity) };
        }
        return item;
      });
      const newCount = newItems.reduce((total, item) => total + Number(item.quantity || 0), 0);
      setCartCount(newCount);
      return newItems;
    });

    try {
      const response = await fetch(`${API_URL}/api/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userId: user._id, 
          productId: targetId, 
          quantity: Number(quantity) 
        }),
      });
      
      if (response.ok) {
        await fetchCart();
      } else {
        setCartItems(previousItems);
        setCartCount(previousCount);
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to update quantity:", errorData.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
      setCartItems(previousItems);
      setCartCount(previousCount);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, fetchCart, clearCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
