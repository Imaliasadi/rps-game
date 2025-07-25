import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/fireBase";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="text-white text-center p-8">Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
}
