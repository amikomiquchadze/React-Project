import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for does not exist.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default NotFound;
