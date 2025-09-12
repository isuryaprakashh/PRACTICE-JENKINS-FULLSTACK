import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../config";
import "./styles.css";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", gender: "" });
  const [updateData, setUpdateData] = useState({ id: "", name: "", age: "", gender: "" });
  const [searchId, setSearchId] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/viewall`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users", { position: "top-right" });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e, setFunc, state) => {
    setFunc({ ...state, [e.target.id]: e.target.value });
  };

  // Add user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/add`, formData);
      toast.success(response.data, { position: "top-right" });
      setFormData({ name: "", age: "", gender: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user", { position: "top-right" });
    }
  };

  // Delete user
  const handleDelete = async (uid) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${uid}`);
      toast.success(response.data, { position: "top-right" });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user", { position: "top-right" });
    }
  };

  // Start editing user
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setUpdateData({ id: user.id, name: user.name, age: user.age, gender: user.gender });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingUserId(null);
    setUpdateData({ id: "", name: "", age: "", gender: "" });
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/update/${updateData.id}`, updateData);
      toast.success(response.data, { position: "top-right" });
      setEditingUserId(null);
      setUpdateData({ id: "", name: "", age: "", gender: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user", { position: "top-right" });
    }
  };

  // Search user by ID
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/display/${searchId}`);
      setFoundUser(response.data);
      toast.success("User found", { position: "top-right" });
    } catch (error) {
      console.error("Error fetching user:", error);
      setFoundUser(null);
      toast.error("User not found", { position: "top-right" });
    }
  };

  return (
    <div className="container">
      <h2 className="title">User Manager</h2>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="card add-form">
        <h3 className="subtitle">Add User</h3>
        <div className="form-grid">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData, formData)}
            placeholder="Name"
            required
            className="input"
          />
          <input
            type="number"
            id="age"
            value={formData.age}
            onChange={(e) => handleChange(e, setFormData, formData)}
            placeholder="Age"
            required
            className="input"
          />
          <input
            type="text"
            id="gender"
            value={formData.gender}
            onChange={(e) => handleChange(e, setFormData, formData)}
            placeholder="Gender"
            required
            className="input"
          />
        </div>
        <button type="submit" className="button primary">Add User</button>
      </form>

      {/* Search User by ID */}
      <div className="card">
        <h3 className="subtitle">Find User by ID</h3>
        <div className="search-bar">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter User ID"
            className="input search-input"
          />
          <button onClick={handleSearch} className="button secondary">Search</button>
        </div>
        {foundUser && (
          <div className="user-info">
            <p><strong>ID:</strong> {foundUser.id}</p>
            <p><strong>Name:</strong> {foundUser.name}</p>
            <p><strong>Age:</strong> {foundUser.age}</p>
            <p><strong>Gender:</strong> {foundUser.gender}</p>
          </div>
        )}
      </div>

      {/* Users List */}
      <div className="card">
        <h3 className="subtitle">All Users</h3>
        {users.length === 0 ? (
          <p className="no-data">No users found</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  {editingUserId === u.id ? (
                    <>
                      <td>{u.id}</td>
                      <td>
                        <input
                          type="text"
                          id="name"
                          value={updateData.name}
                          onChange={(e) => handleChange(e, setUpdateData, updateData)}
                          className="input table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          id="age"
                          value={updateData.age}
                          onChange={(e) => handleChange(e, setUpdateData, updateData)}
                          className="input table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="gender"
                          value={updateData.gender}
                          onChange={(e) => handleChange(e, setUpdateData, updateData)}
                          className="input table-input"
                        />
                      </td>
                      <td>
                        <button onClick={handleUpdate} className="button primary small">Save</button>
                        <button onClick={handleCancelEdit} className="button cancel small">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.age}</td>
                      <td>{u.gender}</td>
                      <td>
                        <button onClick={() => handleEdit(u)} className="button secondary small">Update</button>
                        <button onClick={() => handleDelete(u.id)} className="button danger small">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}