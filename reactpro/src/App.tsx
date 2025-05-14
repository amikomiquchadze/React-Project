import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/authContext";
import PrivateRoute from "../src/privateRoute";
import Login from "./loginPage/login";
import UserTable from "./users/user";
import Count from "./count/count";
import NewUserForm from "./inputForm/inputForms";
import NotFound from "./routeError/notFound";
import Logout from "./loginPage/logout";
import FirstApi from "./firstApi/firstApi";

const Navigation = () => {
  const { isAuthenticated } = useAuth(); // Assuming useAuth is correctly implemented

  return (
    <>
      {/* Show auth state visibly */}
      <div style={{ color: "gray", marginBottom: "1rem" }}>
        Authenticated: {isAuthenticated ? "Yes ✅" : "No ❌"}
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          {/* Navigation should NOT include Route */}
          <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
            <Link to="/users">Users</Link> |{" "}
            <Link to="/count">Counter</Link> |{" "}
            <Link to="/inputForm">Form</Link> |{" "}
            <Link to="/firstApi">First API</Link> |{" "}
            <Link to="/logout">Logout</Link>
          </nav>

          {/* Show navigation and authentication state */}
          <Navigation />

          {/* Define routes here */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UserTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/count"
              element={
                <PrivateRoute>
                  <Count />
                </PrivateRoute>
              }
            />
            <Route
              path="/inputForm"
              element={
                <PrivateRoute>
                  <NewUserForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/firstApi"
              element={
                <PrivateRoute>
                  <FirstApi />
                </PrivateRoute>
              }
            />
            {/* Fallback for undefined paths */}
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
