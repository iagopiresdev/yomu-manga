import { Dispatch, SetStateAction } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Admin Imports
import Dashboard from "./pages/admin/default";
import Profile from "./pages/admin/profile";

// Auth Imports
import SignIn from "./pages/auth/Login";

interface AppRoutesProps {
  setLoggedUser: Dispatch<SetStateAction<string>>;
  loggedUser: string;
}

export default function AppRoutes({ setLoggedUser, loggedUser }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/auth/sign-in" element={<SignIn setLoggedUser={setLoggedUser} />} />

      <Route
        path="/admin/default"
        element={loggedUser ? <Dashboard /> : <Navigate to="/auth/sign-in" replace />}
      />
      <Route
        path="/admin/profile"
        element={loggedUser ? <Profile /> : <Navigate to="/auth/sign-in" replace />}
      />
      <Route
        path="/admin/dashboard"
        element={loggedUser ? <Dashboard /> : <Navigate to="/auth/sign-in" replace />}
      />
    </Routes>
  );
}
