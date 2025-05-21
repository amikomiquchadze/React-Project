import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./userDetails.scss"; // Using your SCSS

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]); // important: run this when ID changes

  const fetchUser = async (clientId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${clientId}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setUser(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const nextId = Number(id) + 1;
    if (nextId <= 10) {
      navigate(`/user/${nextId}`);
    }
  };

  if (loading) return <div className="loading">Loading user details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="first-api-container">
      <h2 className="first-api-header">{user.name}'s Details</h2>
      <ul className="user-list">
        <li className="user-item">
          <span className="user-name">Email:</span>
          <span>{user.email}</span>
        </li>
        <li className="user-item">
          <span className="user-name">Phone:</span>
          <span>{user.phone}</span>
        </li>
        <li className="user-item">
          <span className="user-name">Website:</span>
          <span>
            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noreferrer"
              className="user-name"
            >
              {user.website}
            </a>
          </span>
        </li>
        <li className="user-item">
          <span className="user-name">Address:</span>
          <span>
            {user.address.street}, {user.address.suite}, {user.address.city},{" "}
            {user.address.zipcode}
          </span>
        </li>
        <li className="user-item">
          <span className="user-name">Company:</span>
          <span>{user.company.name}</span>
        </li>
        <li className="user-item">
          <span className="user-name">Catch Phrase:</span>
          <span>{user.company.catchPhrase}</span>
        </li>
      </ul>

      <div className="button-container" style={{ marginTop: "20px" }}>
        <Link to="/firstApi">
          <button className="button cancel">Back to List</button>
        </Link>
        {Number(id) < 10 && (
          <button className="button edit" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
