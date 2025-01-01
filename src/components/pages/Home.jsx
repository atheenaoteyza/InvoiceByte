import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InvoiceCard } from "../Elements/InvoiceCard";
import { NewInvoice } from "../Elements/NewInvoice";
import { filterInvoices } from "../../redux/invoiceSlice";
import rightArrow from "../../assets/icon-arrow-right.svg";
import { motion, AnimatePresence, delay } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { setAsGuest } from "../../redux/authSlice";
import "./Home.css";

export const Home = () => {
  const [newInvoice, setNewInvoice] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [checkedValue, setCheckedValue] = useState(""); // Track which checkbox is selected
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("uid");
  //const invoices = useSelector((state) => state.invoices.invoices);
  const invoices = useSelector((state) => state.invoices.invoices);
  const isGuest = useSelector((state) => state.auth.isGuest);

  useEffect(() => {
    dispatch(filterInvoices(checkedValue));
  }, [checkedValue]);

  const handleCheckboxChange = (value) => {
    setCheckedValue(checkedValue === value ? "" : value); // Toggle selection
  };

  // const invoices = {
  //   INV001: {
  //     id: "INV001",
  //     paymentDue: "2024-01-15",
  //     clientName: "John Doe",
  //     total: "1,200.00",
  //     status: "paid", // Possible values: "paid", "pending", "draft"
  //   },
  //   INV002: {
  //     id: "INV002",
  //     paymentDue: "2024-01-20",
  //     clientName: "Jane Smith",
  //     total: "2,450.50",
  //     status: "pending",
  //   },
  //   INV003: {
  //     id: "INV003",
  //     paymentDue: "2024-02-01",
  //     clientName: "Acme Corporation",
  //     total: "8,999.99",
  //     status: "draft",
  //   },
  // };

  // useEffect(() => {
  //   console.log("Invoices", invoiceTry);
  // }, []);

  return (
    <section
      className={
        isGuest
          ? "dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] "
          : "dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]"
      }
      /* 
            className="dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]"
    
      */
    >
      <div className="dark:text-white bg-[#f8f8fb] dark:bg-[#141625] loginGuest">
        {/* isGuest ? (
          <div className="m-3">
            <button
              // onClick={() => navigate("/Login")}
              // className="borders cursor-pointer duration-100 ease-in-out border border-purple-500 hover:border-purple-500 dark:border-transparent dark:hover:border-purple-500 shadow-sm dark:bg-[#1E2139] bg-white"
            >
              Sign in
            </button>

            <button
              // onClick={() => navigate("/Register")}
              // className="borders cursor-pointer duration-100 ease-in-out border border-purple-500 hover:border-purple-500 dark:border-transparent dark:hover:border-purple-500 shadow-sm dark:bg-[#1E2139] bg-white"
            >
              Sign up
            </button>
          </div>
        ) : null */}
      </div>

      <div className="max-w-3xl flex flex-col mx-auto my-auto">
        <div className="min-w-full max-h-[64px] flex items-center justify-between">
          <div>
            <h1 className="lg:text-4xl md:text-2xl text-xl dark:text-white tracking-wide font-semibold">
              Invoices
            </h1>
            <p className="text-gray-500 font-light">
              {`There are ${Object.keys(invoices).length} total invoices`}
              {/* Object.keys(checkedValue ? currentInvoicesState : invoices)
                  .length */}
            </p>
          </div>
          <div className="flex max-h-full items-center">
            {/* <button className="hidden md:block dark:text-white font-medium">
            </button> */}

            <p className="hidden md:block dark:text-white font-medium">
              Filter by status
            </p>
            <p className="md:hidden dark:text-white font-medium">Filter</p>

            <button
              onClick={() => setIsDropdown(!isDropdown)}
              className="text-white inline-flex items-center right-0 hover:opacity-80 focus:outline-none font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:focus:ring-blue-800"
            >
              <motion.img
                animate={{ rotate: isDropdown ? 90 : null }}
                src={rightArrow}
                className="ml-0"
              />
            </button>

            {isDropdown && (
              <div className="absolute opacity-70 w-35 bg-white dark:bg-[#1E2139] dark:text-white flex  flex-col px-5 lg:px-7 py-1 mt-3 lg:mt-0 lg:py-3  top-[150px] lg:top-[120px] lg:ml-[20px] shadow-2xl rounded-xl ">
                <div
                  onClick={() => handleCheckboxChange("paid")}
                  className="items-center cursor-pointer flex space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={checkedValue === "paid"}
                    readOnly
                    className="accent-[#7c5dfa] hover:accent-[#7c5dfa]"
                  />
                  <p className="text-[#33d69f] bg-[#33d69f0f]">Paid</p>
                </div>
                <div
                  onClick={() => handleCheckboxChange("pending")}
                  className="items-center cursor-pointer flex space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={checkedValue === "pending"}
                    readOnly
                    className="accent-[#7c5dfa] hover:accent-[#7c5dfa]"
                  />
                  <p className="text-[#ff8f00] bg-[#ff8f000f]">Pending</p>
                </div>
              </div>
            )}

            <div className="cursor-pointer ml-3"></div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={() => {
                setNewInvoice(true);
              }}
              className="text-white inline-flex items-center bg-[#7c5dfa] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              New invoice
            </motion.button>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {Object.values(invoices).map((invoice, index) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
          {/* Object.values(checkedValue ? currentInvoicesState : invoices).map(
                (invoice, index) => {
                  const delay = index < 7 ? index * 0.2 : index * 0.1;

                  return (
                    <motion.div
                      key={invoice.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: delay }}
                    >
                      <InvoiceCard invoice={invoice}></InvoiceCard>
                    </motion.div>
                  );
                }
              ) */}
        </div>
      </div>
      <AnimatePresence>
        {newInvoice && <NewInvoice setNewInvoice={setNewInvoice}></NewInvoice>}
      </AnimatePresence>
    </section>
  );
};
