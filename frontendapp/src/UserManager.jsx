import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", gender: "" });
  const [updateData, setUpdateData] = useState({ id: "", name: "", age: "", gender: "" });
  const [searchId, setSearchId] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/viewall`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
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
      setMessage(response.data);
      setFormData({ name: "", age: "", gender: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Error adding user");
    }
  };

  // Delete user
  const handleDelete = async (uid) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${uid}`);
      setMessage(response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error deleting user");
    }
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/update/${updateData.id}`, updateData);
      setMessage(response.data);
      setUpdateData({ id: "", name: "", age: "", gender: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Error updating user");
    }
  };

  // Search user by ID
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/display/${searchId}`);
      setFoundUser(response.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching user:", error);
      setFoundUser(null);
      setMessage("User not found");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">User Manager</h2>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Add User</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" id="name" value={formData.name}
            onChange={(e) => handleChange(e, setFormData, formData)}
            placeholder="Name" required className="border p-2 rounded-lg" />
          <input type="number" id="age" value={formData.age}
            onChange={(e) => handleChange(e, setFormData, formData)}
            placeholder="Age" required className="border p-2 rounded-lg" />
          <input type="text" id="gender" value={formData.gender}
            onChange={(e) => handleChange(e, setFormData, formData)}
            placeholder="Gender" required className="border p-2 rounded-lg" />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add User
        </button>
      </form>

      {/* Update User Form */}
      <form onSubmit={handleUpdate} className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Update User</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="number" id="id" value={updateData.id}
            onChange={(e) => handleChange(e, setUpdateData, updateData)}
            placeholder="User ID" required className="border p-2 rounded-lg" />
          <input type="text" id="name" value={updateData.name}
            onChange={(e) => handleChange(e, setUpdateData, updateData)}
            placeholder="Name" className="border p-2 rounded-lg" />
          <input type="number" id="age" value={updateData.age}
            onChange={(e) => handleChange(e, setUpdateData, updateData)}
            placeholder="Age" className="border p-2 rounded-lg" />
          <input type="text" id="gender" value={updateData.gender}
            onChange={(e) => handleChange(e, setUpdateData, updateData)}
            placeholder="Gender" className="border p-2 rounded-lg" />
        </div>
        <button type="submit" className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
          Update User
        </button>
      </form>

      {/* Search User by ID */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Find User by ID</h3>
        <div className="flex gap-4">
          <input type="number" value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter User ID" className="border p-2 rounded-lg flex-1" />
          <button onClick={handleSearch}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Search
          </button>
        </div>
        {foundUser && (
          <div className="mt-4 p-3 border rounded bg-gray-50">
            <p><strong>ID:</strong> {foundUser.id}</p>
            <p><strong>Name:</strong> {foundUser.name}</p>
            <p><strong>Age:</strong> {foundUser.age}</p>
            <p><strong>Gender:</strong> {foundUser.gender}</p>
          </div>
        )}
      </div>

      {/* Message */}
      {message && <div className="mb-4 text-green-600 font-medium">{message}</div>}

      {/* Users List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">All Users</h3>
        {users.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Age</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="text-center">
                  <td className="border p-2">{u.id}</td>
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.age}</td>
                  <td className="border p-2">{u.gender}</td>
                  <td className="border p-2">
                    <button onClick={() => handleDelete(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
