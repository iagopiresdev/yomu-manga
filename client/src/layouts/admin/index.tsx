import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Import the necessary components
import Navbar from "../../components/navbar"
import Footer from "../../components/footer/Footer";

// Admin Imports
import Dashboard from "../../pages/admin/default";
import Profile from "../../pages/admin/profile";

// Auth Imports
import SignIn from "../../pages/auth/Login";

interface AppRoutesProps {
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function AppRoutes({ setLoggedUser }: AppRoutesProps) {
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
    <div className="flex h-full w-full">
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}>
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
                <Route path="/auth/sign-in" element={<SignIn setLoggedUser={setLoggedUser} />} />
                <Route path="/admin/default" element={<Dashboard />} />
                <Route path="/admin/profile" element={<Profile />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Path: client/src/pages/admin/default/index.tsx