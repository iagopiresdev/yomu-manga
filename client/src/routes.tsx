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

interface AppRoutesProps {
  setLoggedUser: Dispatch<SetStateAction<string>>;
  loggedUser: string;
}

// Create a wrapper component for admin routes
const AdminLayout = ({ children, open, setOpen, currentRoute }:any) => (
  <>
    <Navbar 
      onOpenSidenav={() => setOpen(true)}
      brandText={currentRoute}
    />
    {children}
    <Footer />
  </>
);

export default function AppRoutes({ setLoggedUser, loggedUser }: AppRoutesProps) {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("Main Dashboard");

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  useEffect(() => {
    // Update the current route based on the location
    if (location.pathname.includes("/admin/default")) {
      setCurrentRoute("Main Dashboard");
    } else if (location.pathname.includes("/admin/profile")) {
      setCurrentRoute("Profile");
    } else if (location.pathname.includes("/auth/sign-in")) {
      setCurrentRoute("Sign In");
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/auth/sign-in" element={<SignIn setLoggedUser={setLoggedUser} />} />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={loggedUser ? <AdminLayout open={open} setOpen={setOpen} currentRoute={currentRoute}>
          <Routes>
            <Route path="default" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </AdminLayout> : <Navigate to="/auth/sign-in" replace />}
      />
    </Routes>
  );
}

