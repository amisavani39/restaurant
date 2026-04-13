import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodManagement = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newFood, setNewFood] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Burger',
    image: ''
  });
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/food`);
      setFoods(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching foods", error);
      setLoading(false);
    }
  };

  const deleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        await axios.delete(`${API_URL}/api/food/${id}`);
        setFoods(foods.filter(food => food._id !== id));
        alert("Food deleted successfully");
      } catch (error) {
        console.error("Error deleting food", error);
        alert("Failed to delete food");
      }
    }
  };

  const handleInputChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/food`, newFood);
      if (response.data) {
        alert("Food added successfully!");
        setNewFood({ name: '', description: '', price: '', category: 'Burger', image: '' });
        setShowForm(false);
        fetchFoods();
      }
    } catch (error) {
      console.error("Error adding food", error);
      alert("Failed to add food");
    }
  };

  if (loading) return <div>Loading food items...</div>;

  return (
    <div className="food-management">
      <h1>Food Management</h1>
      <p>Manage your restaurant's food items.</p>
      
      <div style={{ padding: '20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', marginTop: '20px' }}>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '10px 20px', background: '#ffbe33', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '15px' }}
        >
          {showForm ? 'Cancel' : 'Add New Food'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
            <div style={{ marginBottom: '10px' }}>
              <label>Name:</label>
              <input type="text" name="name" value={newFood.name} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Description:</label>
              <textarea name="description" value={newFood.description} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Price:</label>
              <input type="number" name="price" value={newFood.price} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Category:</label>
              <select name="category" value={newFood.category} onChange={handleInputChange} style={{ width: '100%', padding: '8px' }}>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Pasta">Pasta</option>
                <option value="Fries">Fries</option>
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Image URL:</label>
              <input type="text" name="image" value={newFood.image} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
            </div>
            <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Submit
            </button>
          </form>
        )}

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Image</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Food Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Category</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Price</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                  <img src={food.image?.startsWith('http') || food.image?.startsWith('/') ? food.image : (food.image?.startsWith('image/') ? `/${food.image}` : `${API_URL}/${food.image}`)} alt={food.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{food.name}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{food.category}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>₹{food.price}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                  <button style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => deleteFood(food._id)} style={{ color: 'red', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {foods.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px' }}>No food items found.</p>}
      </div>
    </div>
  );
};

export default FoodManagement;
