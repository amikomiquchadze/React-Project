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

// 🔹 Navigation component
const Navigation = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const path = location.pathname;

  const showOnlyUsersAndCount = path === "/count";
  const showUsersCountForm = path === "/users";
  const showEverythingButCounter = path === "/inputForm";

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
      <Link to="/users">Users</Link>

      {!showEverythingButCounter && <span> | <Link to="/count">Counter</Link></span>}

      {(showUsersCountForm || showEverythingButCounter) && (
        <span> | <Link to="/inputForm">Form</Link></span>
      )}

      {showEverythingButCounter && (
        <>
          {" | "}
          <Link to="/firstApi">First API</Link> |{" "}
          <Link to="/user-details-redux">Redux</Link> |{" "}
          <Link to="/logout">Logout</Link>
        </>
      )}

      {!showOnlyUsersAndCount && !showUsersCountForm && !showEverythingButCounter && (
        <>
          {" | "}
          <Link to="/inputForm">Form</Link> |{" "}
          <Link to="/firstApi">First API</Link> |{" "}
          <Link to="/user-details-redux">Redux</Link> |{" "}
          <Link to="/logout">Logout</Link>
        </>
      )}
    </nav>
  );
};

// 🔹 App component
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
