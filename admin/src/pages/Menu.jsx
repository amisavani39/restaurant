import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPlus, FaSync, FaEdit } from "react-icons/fa";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Burger",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/food`);
      setFoods(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching foods", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("category", formData.category);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      if (editMode) {
        await axios.put(`${API_URL}/api/food/${currentId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/api/food`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setShowModal(false);
      resetForm();
      fetchFoods();
    } catch (error) {
      console.error("Error saving food", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "Burger",
    });
    setImageFile(null);
    setEditMode(false);
    setCurrentId(null);
  };

  const deleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${API_URL}/api/food/${id}`);
        fetchFoods();
      } catch (error) {
        console.error("Error deleting food", error);
      }
    }
  };

  const startEdit = (food) => {
    setFormData({
      name: food.name,
      price: food.price,
      description: food.description,
      category: food.category,
    });
    setCurrentId(food._id);
    setEditMode(true);
    setShowModal(true);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_URL}/${imagePath}`;
  };

  return (
    <div className="menu-page">
      <div className="page-header">
        <h1 className="page-title">Menu Management</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
            <FaPlus /> Add Item
          </button>
          <button className="btn btn" style={{ border: "1px solid #ddd" }} onClick={fetchFoods}>
            <FaSync /> Refresh
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1100
        }}>
          <div className="card" style={{ width: "100%", maxWidth: "500px", margin: "20px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2>{editMode ? "Edit Menu Item" : "Add New Menu Item"}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
              <input
                name="name" placeholder="Item Name" required
                value={formData.name} onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
              />
              <input
                name="price" type="number" placeholder="Price" required
                value={formData.price} onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
              />
              <select
                name="category" value={formData.category} onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
              >
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Pasta">Pasta</option>
                <option value="Fries">Fries</option>
                <option value="Drink">Drink</option>
              </select>
              <textarea
                name="description" placeholder="Description" required
                value={formData.description} onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd", minHeight: "80px" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>Food Image</label>
                <input
                  type="file" accept="image/*" onChange={handleFileChange}
                  style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}
                />
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  {editMode ? "Update Item" : "Save Item"}
                </button>
                <button type="button" className="btn" style={{ flex: 1, justifyContent: "center", border: "1px solid #ddd" }} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="menu-container">
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>Loading menu...</div>
        ) : (
          <div className="menu-grid">
            {foods.map((food) => (
              <div className="food-admin-card" key={food._id}>
                <div className="card-image">
                  <img src={getImageUrl(food.image)} alt={food.name} />
                  <span className="card-category">{food.category}</span>
                </div>
                <div className="card-body">
                  <h3>{food.name}</h3>
                  <p className="description">{food.description}</p>
                  <div className="card-footer">
                    <span className="price">${food.price}</span>
                    <div className="actions">
                      <button className="btn-edit" onClick={() => startEdit(food)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="btn-delete" onClick={() => deleteFood(food._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
