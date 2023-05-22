import { Dispatch, SetStateAction } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Import the necessary components
import Navbar from "./components/navbar"
import Footer from "./components/footer/Footer";

// Admin Imports
import Dashboard from "./pages/admin/default";
import Profile from "./pages/admin/profile";

// Auth Imports
import SignIn from "./pages/auth/Login";
import SignUp from "./pages/auth/Register";

// Authenticated User Imports
import MangaDetails from "./pages/auth/MangaDetails";

interface AppRoutesProps {
  setLoggedUser: Dispatch<SetStateAction<string>>;
  loggedUser: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  loggedUser: string;  // Add this line
}

// Create a wrapper component for admin routes
const AdminLayout = ({ children, currentRoute }:AdminLayoutProps) => (
  <>
    <Navbar 
      brandText={currentRoute}
    />
    {children}
    <Footer />
  </>
);

export default function AppRoutes({ setLoggedUser, loggedUser }: AppRoutesProps) {
  const location = useLocation();

  const [currentRoute, setCurrentRoute] = useState("Main Dashboard");


  // Update the current route based on the location
  useEffect(() => {
 
    if (location.pathname.includes("/admin/default")) {
      setCurrentRoute("Main Dashboard");
    } else if (location.pathname.includes("/admin/profile")) {
      setCurrentRoute("Profile");
    } else if (location.pathname.includes("/auth/sign-in")) {
      setCurrentRoute("Sign In");
    } else if (location.pathname.includes("/auth/sign-up")) {
      setCurrentRoute("Sign Up");
    }
  }, [location.pathname]);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/auth/sign-in" element={<SignIn setLoggedUser={setLoggedUser} />} />
      <Route path="/auth/sign-up" element={<SignUp setLoggedUser={setLoggedUser} />} />
      <Route path="/manga-details/:mangaName" element={loggedUser ? <MangaDetails /> : <Navigate to="/auth/sign-in" replace />} />
      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={loggedUser ? <AdminLayout currentRoute={currentRoute} loggedUser={loggedUser}>
          <Routes>
            <Route path="default" element={<Dashboard />} />
            <Route path="profile" element={<Profile loggedUser={loggedUser} />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </AdminLayout> : <Navigate to="/auth/sign-in" replace />}
      />

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>

  );
}

