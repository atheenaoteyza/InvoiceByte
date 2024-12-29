import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import Bounce transition
import logo from "../assets/logo.png";
import profile from "../assets/image-avatar.jpg";

export const Header = () => {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const location = useLocation();
  const navigate = useNavigate();
  const isGuest = true;

  useEffect(() => {
    localStorage.setItem("darkMode", isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    setLoading(true); // Set loading to true when the logout process starts
    sessionStorage.clear();
    console.log("Logged out");

    dispatch(logout());

    setTimeout(() => {
      // Simulate logout delay
      setLoading(false); // Set loading to false after logout is completed
      setIsModalOpen(false);

      navigate("/Login");
    }, 1000); // Simulate a 1-second delay for logging out
  };

  const loginNotification = () => {
    toast("Log in to save and sync your invoices across devices.", {
      style: {
        backgroundColor: "#141625", // Set background color with opacity
        color: "white", // Ensure text is visible
      },
      // progressStyle: {
      //   backgroundColor: "#7c5dfa", // Replace with your desired color
      // },
      // progressClassName: "custom-progress-bar",
      theme: "dark",
      position: "top-center",
      autoClose: 5000, // Time in milliseconds
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
      onClick: () => navigate("/Login"), // Navigate to login on toast click
    });
  };

  // Conditionally render Header based on the current route
  if (location.pathname === "/Login" || location.pathname === "/Register") {
    return null; // Return nothing if on /Login or /Register page
  }

  return (
    <>
      {/* Header for Small Screens */}
      <header className="lg:hidden h-[80px] z-50 duration-300 ease-in-out dark:bg-[#1E2139] bg-[#373b53] flex items-center justify-between">
        <img src={logo} alt="logo" className="h-20" />
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="py-2.5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Theme
          </button>
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

            {/* Bottom Side */}
            <div className="flex flex-col items-center">
              <button
                className="bg-blue-700 dark:bg-blue-600 h-[50px] w-[50px] rounded-full mb-4 flex items-center justify-center text-white text-lg font-bold"
                onClick={toggleDarkMode}
              >
                T
              </button>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E2139] rounded-lg shadow-lg p-6 w-[300px] text-center relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Profile
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
              Hi, User!
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 mb-2"
            >
              {loading ? "Logging out..." : "Logout"}{" "}
              {/* Change text based on loading state */}
            </button>
            <button
              onClick={toggleModal}
              className="w-full bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
