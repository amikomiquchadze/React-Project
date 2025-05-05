import { useState } from "react";
import UserTable from "./users/user";
import Count from "./count/count";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <div>
        <div>
          <Link to="/users">Go to Users</Link>
        </div>
        <div>
          <Link to="/Count">Go to Counter</Link>
        </div>
      </div>
      <AppRoutes />
    </Router>
  );
}

export default App;
