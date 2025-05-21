import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/authContext";
import PrivateRoute from "./privateRoute";

import Login from "./loginPage/login";
import UserTable from "./users/user";
import Count from "./count/count";
import NewUserForm from "./inputForm/inputForms";
import NotFound from "./routeError/notFound";
import Logout from "./loginPage/logout";
import FirstApi from "./firstApi/firstApi";
import UserDetails from "./userDetails/userDetails";
import UserDetailsRedux from "./userDetails/userDetailsRedux";

const Navigation = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const path = location.pathname;

  // Show only Users and Counter links on /count route
  if (path.startsWith("/count")) {
    return (
      <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
        <Link to="/users">Users</Link> | <Link to="/count">Counter</Link>
      </nav>
    );
  }

  // Show all except Counter on /inputForm route
  if (path === "/inputForm") {
    return (
      <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
        <Link to="/users">Users</Link> | <Link to="/inputForm">Form</Link> |{" "}
        <Link to="/firstApi">First API</Link> | <Link to="/user-details-redux">Redux</Link> |{" "}
        <Link to="/logout">Logout</Link>
      </nav>
    );
  }

  // Show all links on /users and all other routes except count and inputForm
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
      <Link to="/users">Users</Link> | <Link to="/count">Counter</Link> | <Link to="/inputForm">Form</Link> |{" "}
      <Link to="/firstApi">First API</Link> | <Link to="/user-details-redux">Redux</Link> |{" "}
      <Link to="/logout">Logout</Link>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navigation />

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
            path="/count/:age"
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
          <Route
            path="/user-details-redux"
            element={
              <PrivateRoute>
                <UserDetailsRedux />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <UserDetails />
              </PrivateRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
