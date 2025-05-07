import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./auth/authContext";
import PrivateRoute from "../src/privateRoute";
import Login from "./loginPage/login";
import UserTable from "./users/user";
import Count from "./count/count";
import NewUserForm from "./inputForm/inputForms";
import NotFound from "./routeError/notFound";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          {/* Navigation should NOT include Route */}
          <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
            <Link to="/users">Users</Link> |{" "}
            <Link to="/count">Counter</Link> |{" "}
            <Link to="/inputForm">Form</Link>
          </nav>

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
            {/* Fallback for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
