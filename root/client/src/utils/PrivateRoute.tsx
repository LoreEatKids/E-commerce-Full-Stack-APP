import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface childrenType {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: childrenType) {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" /> : children;
}