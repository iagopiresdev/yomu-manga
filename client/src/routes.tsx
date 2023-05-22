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
import Configurations from "./pages/admin/profile/Configurations";


interface User {
  token: string;
  refreshToken: {
    userId: string;
  };
}

interface AppRoutesProps {
  setLoggedUser: Dispatch<SetStateAction<User | null>>;
  loggedUser: User | null;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  loggedUser: User | null;
}

const AdminLayout = ({ children, currentRoute }: AdminLayoutProps) => (
  <>
    <Navbar 
      brandText={currentRoute}
    />
    {children}
    <Footer />
  </>
);

const ConfigurationsLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <Footer />
  </>
);

export default function AppRoutes({ setLoggedUser, loggedUser }: AppRoutesProps) {
  const location = useLocation();

  const [currentRoute, setCurrentRoute] = useState("Main Dashboard");

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
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/auth/sign-in" element={<SignIn setLoggedUser={setLoggedUser} />} />
      <Route path="/auth/sign-up" element={<SignUp setLoggedUser={setLoggedUser} />} />
      <Route path="/manga-details/:mangaName" element={loggedUser ? <MangaDetails /> : <Navigate to="/auth/sign-in" replace />} />
      
      <Route
        path="/admin/*"
        element={loggedUser ? 
          <AdminLayout currentRoute={currentRoute} loggedUser={loggedUser}>
            <Routes>
              <Route path="default" element={<Dashboard />} />
              <Route path="profile" element={<Profile loggedUser={loggedUser} />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Routes>
          </AdminLayout> 
          : 
          <Navigate to="/auth/sign-in" replace />
        }
      />
      <Route
        path="/admin/config/*"
        element={loggedUser ? 
          <ConfigurationsLayout>
            <Routes>
              <Route path="" element={<Configurations loggedUser={loggedUser} setLoggedUser={setLoggedUser} />} />
            </Routes>
          </ConfigurationsLayout> 
          : 
          <Navigate to="/auth/sign-in" replace />
        }
      />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}
