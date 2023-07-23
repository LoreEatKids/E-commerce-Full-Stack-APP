import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import "./styles/main.scss";
import { childrenType } from "./types/userTypes";
import PrivateRoute from "./utils/PrivateRoute";

export default function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }: childrenType) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <Toaster position="top-left" reverseOrder={false}/>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/home" element={<Home />} />
        <Route path="/login" element={<PrivateRoute> <Login /> </PrivateRoute>} />
        <Route path="/register" element={<PrivateRoute> <Register /> </PrivateRoute>} />
        <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}