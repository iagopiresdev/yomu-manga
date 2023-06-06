import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from './components/UserContext'; 

// Import the necessary components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Admin Imports
import Profile from "./pages/profile/Profile";

// Auth Imports
import SignIn from "./pages/auth/Login";
import SignUp from "./pages/auth/Register";

// Authenticated User Imports
import MangaDetails from "./pages/auth/MangaDetails";
import Configurations from "./pages/profile/Dashboard";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
}

const AdminLayout = ({
  children,
  currentRoute,
}: AdminLayoutProps) => (
  <>
    <Navbar brandText={currentRoute} />
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

// Higher order component for protecting routes
const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (!user) {
      return <Navigate to='/auth/sign-in' replace />;
  }

  return <>{children}</>;
}



export default function AppRoutes() {
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
      <Routes key={location.key}>
          <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />

          <Route path="/manga-details/:mangaName" element={
              <Protected>
                  <MangaDetails />
              </Protected>
          } />

          <Route path="/admin/*" element={
              <AdminLayout currentRoute={currentRoute}>
                  <Routes>
                      <Route path="profile" element={
                          <Protected>
                              <Profile />
                          </Protected>
                      } />
                  </Routes>
              </AdminLayout>
          } />

          <Route path="/admin/config/*" element={
              <ConfigurationsLayout>
                  <Routes>
                      <Route path="" element={
                          <Protected>
                              <Configurations />
                          </Protected>
                      } />
                  </Routes>
              </ConfigurationsLayout>
          } />

          <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
  );
}