import { Dispatch, SetStateAction } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Import the necessary components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";

// Admin Imports

import Profile from "./pages/profile/Profile";

// Auth Imports
import SignIn from "./pages/auth/Login";
import SignUp from "./pages/auth/Register";

// Authenticated User Imports
import MangaDetails from "./pages/auth/MangaDetails";
import Configurations from "./pages/profile/Dashboard";


export interface User {
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

const AdminLayout = ({ children, currentRoute, loggedUser }: AdminLayoutProps) => (
  <>
    <Navbar 
      brandText={currentRoute}
      loggedUser={loggedUser}
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
      <Route path="/manga-details/:mangaName" element={loggedUser ? <MangaDetails user={loggedUser} /> : <Navigate to="/auth/sign-in" replace />} />

      
      <Route
        path="/admin/*"
        element={loggedUser ? 
          <AdminLayout currentRoute={currentRoute} loggedUser={loggedUser}>
            <Routes>

              <Route path="profile" element={<Profile loggedUser={loggedUser} />} />

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
