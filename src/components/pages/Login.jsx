import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  authenticateUser,
  setInvoiceByUserAsync,
} from "../../redux/invoiceThunks";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true); // Set loading state to true

    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await dispatch(authenticateUser(credentials));
      if (typeof sessionStorage !== "undefined") {
        const userId = sessionStorage.getItem("uid");
        if (userId) {
          await dispatch(setInvoiceByUserAsync(userId));
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Invalid", error);
    } finally {
      setLoggingIn(false); // Reset loading state to false
    }
  };
  return (
    <section className="dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            We invest in the world’s potential
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
          <a
            href="#"
            className="text-[#7c5dfa] hover:underline font-medium text-lg inline-flex items-center"
          >
            Read more about our app
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
        <div>
          <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sign in to Flowbite
            </h2>
            {/* Form starts here */}
            <form
              onSubmit={handleLogin} /*Function to handle login */
              className="mt-8 space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  ref={emailRef} /*Reference for email input */
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  ref={passwordRef} /*Reference for password input */
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    name="remember"
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div className="ms-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-500 dark:text-gray-400"
                  >
                    Remember this device
                  </label>
                </div>
                <a
                  href="#"
                  className="ms-auto text-sm font-medium text-[#7c5dfa] hover:underline"
                >
                  Lost Password?
                </a>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loggingIn} // Disable button while logging in
                  className="w-full px-5 py-3 text-base font-medium text-center text-white  rounded-lg  focus:ring-4 focus:ring-blue-300 sm:w-auto bg-[#7c5dfa] hover:opacity-80 dark:focus:ring-blue-800"
                >
                  {loggingIn ? "Logging in..." : "Login to your account"}
                </button>
                <button
                  type="button" // Prevent form submission
                  onClick={() => navigate("/")}
                  className="w-full px-5 py-3 text-base font-medium text-center text-white  rounded-lg  focus:ring-4 focus:ring-blue-300 sm:w-auto bg-[#7c5dfa] hover:opacity-80 dark:focus:ring-blue-800"
                >
                  Continue as guest
                </button>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Not registered yet?{" "}
                {/* Using React Router Link for navigation */}
                <Link
                  /* to="/Register" Path to registration page */
                  className="text-[#7c5dfa] hover:underline"
                >
                  Create account
                </Link>
              </div>
            </form>
            {/* Form ends here */}
          </div>
        </div>
      </div>
    </section>
  );
};
