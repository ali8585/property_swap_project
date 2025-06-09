import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyProperties from "./pages/MyProperties";
import UploadCSV from "./pages/UploadCSV";
import Profile from "./pages/Profile";
import MapAndRecommendations from "./pages/MapAndRecommendations";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      {token && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-properties"
          element={token ? <MyProperties token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/upload"
          element={token ? <UploadCSV token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={token ? <Profile token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/map"
          element={token ? <MapAndRecommendations token={token} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
