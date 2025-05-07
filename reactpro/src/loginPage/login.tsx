import React, { useState } from "react";
import { useAuth } from "../auth/authContext"; //
//  Importing auth context
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/users"); // Redirect after login
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
   
        <div className={styles["login-container"]}>
          <h2>Login</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      );
      
};

export default Login;
