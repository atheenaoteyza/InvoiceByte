import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import Bounce transition
import logo from "../assets/logo.png";
import profile from "../assets/image-avatar.jpg";
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
import { motion } from "framer-motion";

export const Header = () => {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || true
  );

  const location = useLocation();
  const navigate = useNavigate();
  const isGuest = true;

  // Apply dark mode to HTML element on load
  useEffect(() => {
    localStorage.setItem("darkMode", isDark);
    if (isDark) {
      document.documentElement.classList.add("dark"); // Adding dark mode class to <html>
    } else {
      document.documentElement.classList.remove("dark"); // Removing dark mode class from <html>
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark); // Toggle dark mode state
  };

  const loginNotification = () => {
    toast("Log in to save and sync your invoices across devices.", {
      style: { backgroundColor: "#141625", color: "white" },
      theme: "dark",
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
      onClick: () => navigate("/Login"),
    });
  };

  const transition = {
    type: "spring",
    stiffness: 200,
    damping: 10,
  };

  // Conditionally render Header based on the current route
  if (location.pathname === "/Login" || location.pathname === "/Register") {
    return null;
  }

  return (
    <>
      {/* Header for Small Screens */}
      <header className="lg:hidden h-[80px] z-50 duration-300 ease-in-out dark:bg-[#1E2139] bg-[#373b53] flex items-center justify-between">
        <img src={logo} alt="logo" className="h-20" />
        <div className="flex items-center">
          {isDark ? (
            <motion.img
              onClick={toggleDarkMode}
              initial={{ scale: 0.6, rotate: 90 }}
              animate={{ scale: 1, rotate: 360, transition }}
              whileTap={{ scale: 0.9, rotate: 15 }}
              src={moon}
              className="cursor-pointer h-6"
              alt="Toggle to Light Mode"
            />
          ) : (
            <motion.img
              onClick={toggleDarkMode}
              initial={{ scale: 0.6, rotate: 90 }}
              animate={{ scale: 1, rotate: 360, transition }}
              whileTap={{ scale: 0.9, rotate: 15 }}
              src={sun}
              className="cursor-pointer h-7"
              alt="Toggle to Dark Mode"
            />
          )}
          <img
            src={profile}
            className="h-10 w-10 ml-4 mr-4 rounded-full cursor-pointer"
            onClick={isGuest ? loginNotification : toggleModal}
            alt="Profile"
          />
        </div>
      </header>

      {/* Sidebar for Large Screens */}
      <div className="hidden lg:block">
        <div className="fixed z-50 w-[100px] rounded-r-3xl flex-col top-0 left-0 h-screen dark:bg-[#1E2139] bg-[#373b53]">
          <div className="h-full w-full flex flex-col justify-between items-center">
            <img src={logo} alt="logo" className="relative" />
            <div className="flex flex-col items-center">
              {isDark ? (
                <motion.img
                  onClick={toggleDarkMode}
                  initial={{ scale: 0.6, rotate: 90 }}
                  animate={{ scale: 1, rotate: 360, transition }}
                  whileTap={{ scale: 0.9, rotate: 15 }}
                  src={moon}
                  className="cursor-pointer h-6 mb-4"
                  alt="Toggle to Light Mode"
                />
              ) : (
                <motion.img
                  onClick={toggleDarkMode}
                  initial={{ scale: 0.6, rotate: 90 }}
                  animate={{ scale: 1, rotate: 360, transition }}
                  whileTap={{ scale: 0.9, rotate: 15 }}
                  src={sun}
                  className="cursor-pointer h-7 mb-4"
                  alt="Toggle to Dark Mode"
                />
              )}
              <div className="w-[100px] border-dotted border-t border-[#494e6e] my-6"></div>
              <img
                src={profile}
                className="h-[50px] rounded-full cursor-pointer mb-3"
                onClick={isGuest ? loginNotification : toggleModal}
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
