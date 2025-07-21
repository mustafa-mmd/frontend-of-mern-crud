import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import Login from "./components/Login";
import Register from "./components/Register";
import BlogDetail from "./components/Blog-Detail";
import EditBlog from "./components/EditBlog";

// Private route wrapper
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="bg-slate-200 main min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/*  Default redirect */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Register and Login accessible to all */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/add-post"
            element={
              <PrivateRoute>
                <NewPost />
              </PrivateRoute>
            }
          />

          <Route
            path="/blog/:id"
            element={
              <PrivateRoute>
                <BlogDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/blog/:id/edit"
            element={
              <PrivateRoute>
                <EditBlog />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
