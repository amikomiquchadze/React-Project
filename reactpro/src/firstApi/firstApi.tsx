import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchUsers, deleteUser, updateUser } from "../redux/userSlice";
import "./firstApi.scss";

const FirstApi: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    dispatch(fetchUsers()); // fetch page 1
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (id: number, name: string) => {
    setEditUserId(id);
    setEditedName(name);
  };

  const handleUpdate = (id: number) => {
    dispatch(updateUser({ id, name: editedName }));
    setEditUserId(null);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="first-api-container">
      <h2 className="first-api-header">User List</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {editUserId === user.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="user-input"
                />
                <div className="button-container">
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="button save"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditUserId(null)}
                    className="button cancel"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="user-name">{user.name}</span>
                <div className="button-container">
                  <button
                    onClick={() => handleEdit(user.id, user.name)}
                    className="button edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="button delete"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FirstApi;
