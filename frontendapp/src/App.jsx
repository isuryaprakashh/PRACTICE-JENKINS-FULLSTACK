import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [message, setMessage] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:2000/springbootuserapi/display");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Add user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2000/springbootuserapi/add", formData);
      setMessage(response.data);
      setFormData({ name: "", age: "", gender: "" });
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Error adding user");
    }
  };

  // Delete user
  const handleDelete = async (uid) => {
    try {
      const response = await axios.delete(`http://localhost:2000springbootuserapi//delete/${uid}`);
      setMessage(response.data);
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error deleting user");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">User Manager</h2>

      {/* Add User Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-6"
      >
        <h3 className="text-xl font-semibold mb-4">Add User</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            id="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            required
            className="border p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add User
        </button>
      </form>

      {/* Message */}
      {message && (
        <div className="mb-4 text-green-600 font-medium">{message}</div>
      )}

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
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
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
