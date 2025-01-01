import React, { useState, useEffect } from "react";
import leftArrow from "./../../assets/icon-arrow-left.svg";
import {
  getInvoiceById,
  updateInvoiceStatus,
  deleteInvoice,
} from "../../redux/invoiceSlice";
import { InvoiceStatus } from "../Elements/InvoiceStatus";
import { setError } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NewInvoice } from "../Elements/NewInvoice";

const InvoiceById = () => {
  const [newInvoice, setNewInvoice] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoiceId = location.search.substring(1);

  const invoices = useSelector((state) => state.invoices.invoices);
  const isInvoicesLoaded = Object.keys(invoices).length > 0; // Check if invoices are loaded

  useEffect(() => {
    const setInvoice = () => {
      try {
        console.log("invoice Id:", invoiceId);
        dispatch(getInvoiceById({ id: invoiceId }));
        console.log("SELECTING", invoices[invoiceId]);
      } catch (error) {
        dispatch(setError(error.message));
      }
    };
    setInvoice();
  }, [dispatch, invoiceId, isInvoicesLoaded]);

  const invoice = invoices[invoiceId];

  useEffect(() => {
    console.log("Current invoiceById state:", invoice);
  }, [invoice]);

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      dispatch(deleteInvoice({ id: invoiceId }));
      console.log("deleted", { id: invoiceId });
      navigate("/");
    } catch (error) {
      console.error("error", error);
    }
  };
  //   const update = useSelector((state) => state.invoices.invoices[invoiceId]);
  //   console.log("update", update);
  const handleMakeAsPaid = (e) => {
    e.preventDefault();
    try {
      dispatch(updateInvoiceStatus({ id: invoiceId, status: "paid" }));
    } catch (error) {
      console.error("error", error);
      console.log(error);
    }
  };

  const handleEdit = (e) => {
    setNewInvoice(true);
  };
  return (
    <section className="dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]">
      {invoice ? (
        <div className="dark:bg-[#141625] mx-auto duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 max-w-3xl lg:py-[72px]">
          <div className="">
            <button
              onClick={(e) => navigate("/")}
              className=" flex items-center space-x-4 group dark:text-white font-thin"
            >
              <img className="" src={leftArrow} />
              <p className=" group-hover:opacity-80">Go back</p>
            </button>

            <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white dark:bg-[#1e2139]">
              <div className=" flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
                <h1 className=" text-gray-600 dark:text-gray-400">Status</h1>
                <InvoiceStatus type={invoice.status} />{" "}
                {/* Static PaidStatus component */}
              </div>
              <div className=" md:block hidden">
                <button
                  onClick={handleEdit}
                  className=" text-[#7e88c3] text-center dark:bg-[#252945] hover:opacity-80 bg-slate-100 p-3 px-7 rounded-full "
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className=" ml-3 text-center text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full"
                >
                  Delete
                </button>
                {invoice.status === "paid" ? null : (
                  <button
                    onClick={handleMakeAsPaid}
                    className=" ml-3 text-center text-white bg-[#7c5dfa] hover:opacity-80 p-3 px-7 rounded-full"
                  >
                    Make as Paid
                  </button>
                )}
              </div>
            </div>

            <div className=" mt-4 rounded-lg w-full px-6 py-6 bg-white dark:bg-[#1e2139]">
              <div className=" flex flex-col md:flex-row items-start justify-between w-full ">
                <div>
                  <h1 className=" font-semibold dark:text-white text-xl">
                    <span className="text-[#7e88c3]">#</span>
                    {invoice.id}
                  </h1>
                  <p className=" text-sm text-gray-500">{invoice.clientName}</p>
                </div>
                <div className=" mt-4 md:mt-0 text-left text-gray-400 text-sm md:text-right felx flex-col items-center">
                  <p>{invoice.senderAddress.street}</p>
                  <p>{invoice.senderAddress.city}</p>
                  <p>{invoice.senderAddress.postCode}</p>
                  <p>{invoice.senderAddress.country}</p>
                </div>
              </div>

              <div className=" mt-10 grid grid-cols-2 w-full md:grid-cols-3">
                <div className=" flex flex-col justify-between">
                  <div>
                    <h3 className=" text-gray-400 font-thin ">Invoice Date</h3>
                    <h1 className=" text-lg font-semibold dark:text-white">
                      {invoice.createdAt}
                    </h1>
                  </div>
                  <div>
                    <h3 className=" text-gray-400 font-thin ">Payment Due</h3>
                    <h1 className=" dark:text-white text-lg font-semibold">
                      {invoice.paymentDue}
                    </h1>
                  </div>
                </div>

                <div className="">
                  <p className=" text-gray-400 font-thin">Bill to</p>
                  <h1 className=" dark:text-white text-lg font-semibold break-words mr-2">
                    {invoice.clientName}
                  </h1>
                  <p className=" text-gray-400 font-thin">
                    {invoice.clientAddress.street}
                  </p>
                  <p className=" text-gray-400 font-thin">
                    {invoice.clientAddress.city}
                  </p>
                  <p className=" text-gray-400 font-thin">
                    {invoice.clientAddress.country}
                  </p>
                  <p className=" text-gray-400 font-thin">
                    {invoice.clientAddress.postCode}
                  </p>
                </div>

                <div className=" mt-8 md:mt-0">
                  <p className=" text-gray-400 font-thin">Sent to</p>
                  <h1 className=" dark:text-white text-lg font-semibold">
                    {invoice.clientEmail}
                  </h1>
                </div>
              </div>

              {/* Last Section */}
              <div className=" sm:hidden mt-10 bg-[#f9fafe] dark:bg-[#252945] rounded-lg rounded-b-none space-y-4  p-10">
                <div className=" justify-between text-lg dark:text-white flex">
                  <h1>Item 1</h1>
                  <h1>£50.00</h1>
                </div>
                <div className=" justify-between text-lg dark:text-white flex">
                  <h1>Item 2</h1>
                  <h1>£30.00</h1>
                </div>
              </div>

              {/* <div className=" hidden sm:block mt-10 bg-[#f9fafe] dark:bg-[#252945] rounded-lg rounded-b-none space-y-4  p-10">
                  <div className=" flex justify-around">
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Item name</p>
                      <h1 className=" dark:text-white text-base font-semibold">
                        Item 1
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Qty.</p>
                      <h1 className=" dark:text-white text-base font-semibold">
                        2
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Item price</p>
                      <h1 className=" dark:text-white text-base font-semibold">
                        £25.00
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Total</p>
                      <h1 className=" dark:text-white text-base font-semibold">
                        £50.00
                      </h1>
                    </div>
                  </div>
  
                  <div className=" flex justify-around">
                    <div className=" space-y-4">
                      <h1 className=" dark:text-white text-base font-semibold">
                        Item 1
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <h1 className=" dark:text-white text-base font-semibold">
                        2
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <h1 className=" dark:text-white text-base font-semibold">
                        £25.00
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <h1 className=" dark:text-white text-base font-semibold">
                        £50.00
                      </h1>
                    </div>
                  </div>
                </div> */}

              <div className="hidden sm:block mt-10 bg-[#f9fafe] dark:bg-[#252945] rounded-lg rounded-b-none space-y-4 p-10">
                {/* Header Row */}
                <div className="flex justify-between">
                  <div className="w-1/4 text-center">
                    <p className="text-gray-400 font-thin">Item name</p>
                  </div>
                  <div className="w-1/4 text-center">
                    <p className="text-gray-400 font-thin">Qty.</p>
                  </div>
                  <div className="w-1/4 text-center">
                    <p className="text-gray-400 font-thin">Item price</p>
                  </div>
                  <div className="w-1/4 text-center">
                    <p className="text-gray-400 font-thin">Total</p>
                  </div>
                </div>

                {/* Data Row */}
                {invoice.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div className="w-1/4 text-center">
                      <h1 className="dark:text-white text-base font-semibold">
                        {item.name}
                      </h1>
                    </div>
                    <div className="w-1/4 text-center">
                      <h1 className="dark:text-white text-base font-semibold">
                        {item.quantity}
                      </h1>
                    </div>
                    <div className="w-1/4 text-center">
                      <h1 className="dark:text-white text-base font-semibold">
                        {`£ ${item.price}.00`}
                      </h1>
                    </div>
                    <div className="w-1/4 text-center">
                      <h1 className="dark:text-white text-base font-semibold">
                        {`£ ${item.total}.00`}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>

              <div className=" p-10 font-semibold text-white rounded-lg rounded-t-none justify-between flex dark:bg-black bg-gray-700 ">
                <h3 className=" text-xl ">Amount Due</h3>

                <h1 className=" text-3xl">{`£${invoice.total}.00`}</h1>
              </div>
              {newInvoice && (
                <NewInvoice
                  setNewInvoice={setNewInvoice}
                  type="edit"
                ></NewInvoice>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>loading</>
      )}
    </section>
  );
};

export default InvoiceById;
