import React, { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../type";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styles from "./users.module.scss";
const initialUsers: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    age: "22",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Editor",
    age: "29",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Viewer",
    age: "35",
  },
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "",
    age: "",
  });
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      ...formData,
    };
    setUsers((prev) => [...prev, newUser]);
    setFormData({ name: "", email: "", role: "", age: "0" });
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  const openEditModal = (user: User) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      age: user.age,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUserId(null);
    setFormData({ name: "", email: "", role: "", age: "" });
  };

  const saveEdit = () => {
    if (editingUserId !== null) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUserId ? { ...user, ...formData } : user
        )
      );
    }
    closeModal();
  };
  return (
    <section className={styles["table-container"]}>
      <h2>Add New User</h2>
      <form onSubmit={handleAddUser} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          style={{ marginRight: "0.5rem", width: "60px" }}
        />
        <button type="submit">Add User</button>
      </form>
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Age</th>
            <th>Actions</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {" "}
                <Link to={`/counter/${user.age}`}>{user.age} </Link>
              </td>
              {/* <td><input name="name" value={formData.name} onChange={handleChange} /></td>
                  <td><input name="email" value={formData.email} onChange={handleChange} /></td>
                  <td><input name="role" value={formData.role} onChange={handleChange} /></td>
                  <td><input name="age" type="number" value={formData.age} onChange={handleChange} /></td> */}
              <td>
                <button
                  className={styles.edit}
                  onClick={() => openEditModal(user)}
                >
                  Edit
                </button>
              </td>

              <td>
                {/* <button onClick={() => openEditModal(user)}>Edit</button> */}
                <button
                  onClick={() => handleDelete(user.id)}
                  className={styles.delete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              width: "300px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <h3>Edit User</h3>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            <br />
            <br />
            <button onClick={saveEdit}>Save</button>
            <button onClick={closeModal} style={{ marginLeft: "0.5rem" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserTable;
