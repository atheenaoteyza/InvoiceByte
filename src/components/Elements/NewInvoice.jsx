import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addInvoiceOptimistically } from "../../redux/invoiceThunks";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export const NewInvoice = ({ setNewInvoice, type }) => {
  const userId = sessionStorage.getItem("uid");
  const dispatch = useDispatch();
  const [invoiceData, setInvoiceData] = useState({
    uiid: "",
    createdAt: "",
    status: "pending",
    paymentDue: "",
    description: "",
    paymentTerms: 1,
    clientName: "",
    clientEmail: "",
    senderStreet: "",
    senderCity: "",
    senderPostCode: "",
    senderCountry: "",
    clientStreet: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    items: [],
    total: 0,
  });
  const invoiceId = location.search.substring(1);
  const invoices = useSelector((state) => state.invoices.invoices);
  const invoice = invoices[invoiceId];
  const { isGuest } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Current invoiceById state:", invoice);
  }, [invoice]);

  useEffect(() => {
    if (type == "edit") {
      const formatted = new Date(invoice.createdAt);
      setInvoiceData({
        uiid: invoice.id,
        status: invoice.status,
        paymentDue: invoice.paymentDue,
        description: invoice.description,
        paymentTerms: invoice.paymentTerms,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        senderStreet: invoice.senderAddress.street,
        senderCity: invoice.senderAddress.city,
        senderPostCode: invoice.senderAddress.postCode,
        senderCountry: invoice.clientAddress.country,
        clientStreet: invoice.clientAddress.street,
        clientCity: invoice.clientAddress.city,
        clientPostCode: invoice.clientAddress.postCode,
        clientCountry: invoice.clientAddress.country,
        createdAt: formatted.toISOString().split("T")[0],
        items: invoice.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: parseFloat(item.price) * parseFloat(item.quantity),
        })),
      });
    }
  }, [invoice]);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => {
      if (index !== null) {
        return {
          ...prev,
          items: prev.items.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
          ),
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };
  useEffect(() => {
    console.log("Updated invoiceDate:", invoiceData.createdAt);
  }, [invoiceData.createdAt]);

  const handleAddItem = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { name: "", quantity: 0, price: 0 }],
    }));
  };

  const handleRemoveItem = (indexToRemove) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((_, index) => index !== indexToRemove),
    }));
  };

  // const handleSave = async (e) => {
  //   if (isGuest) {
  //     dispatch(addInvoice(invoiceData));
  //   }
  //   if (type == "edit") {
  //     e.preventDefault();
  //     try {
  //       invoiceData.id = invoice.id;
  //       console.log("invoiceId", invoiceData.id);
  //       console.log("Invoice Date before saving:", invoiceData.createdAt);

  //       await dispatch(addInvoiceOptimistically(invoiceData, userId));
  //     } catch (error) {
  //       console.error("error", error);
  //     }
  //   } else {
  //     try {
  //       console.log("invoiceId one", invoiceData.id);

  //       await dispatch(addInvoiceOptimistically(invoiceData, userId));
  //       console.log("invoiceId two", invoiceData.id);

  //       setNewInvoice(false);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  //   setNewInvoice(false);
  // };
  const guestId = "Guest";

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent form submission for all cases, if applicable

    try {
      if (isGuest) {
        if (type === "edit") {
          invoiceData.id = invoice.id;
        }

        console.log("Guest mode: adding invoice");
        dispatch(addInvoiceOptimistically(invoiceData, guestId));
      } else if (type === "edit") {
        invoiceData.id = invoice.id;
        console.log("Editing invoice:", invoiceData.id);
        console.log("Invoice Date before saving:", invoiceData.createdAt);

        await dispatch(addInvoiceOptimistically(invoiceData, userId));
      } else {
        console.log("Adding new invoice:", invoiceData.id);
        await dispatch(addInvoiceOptimistically(invoiceData, userId));
      }
      console.log("Invoice saved successfully");
    } catch (error) {
      console.error("Error saving invoice:", error);
    } finally {
      setNewInvoice(false); // Close invoice modal or reset state
    }
  };

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#000005be]">
        <motion.div
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ x: -700, transition: { duration: 0.2 } }}
          className="  scrollbar-hide flex flex-col dark:text-white dark:bg-[#141625] bg-white  md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl"
        >
          <h1 className="font-semibold dark:text-white text-3xl">
            Create Invoice
          </h1>

          <div className="overflow-y-scroll scrollbar-hide my-14">
            <h1 className="text-[#7c5dfa] mb-4 font-medium">Bill From</h1>

            <div className="grid grid-cols-3 mx-1 space-y-4">
              <div className="flex flex-col col-span-3">
                <label className="text-gray-400 font-light">
                  Street Address
                </label>
                <input
                  name="senderStreet"
                  value={invoiceData.senderStreet}
                  onChange={handleChange}
                  type="text"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                />
              </div>

              <div className="flex flex-col mr-4 col-span-1">
                <label className="text-gray-400 font-light">City</label>
                <input
                  name="senderCity"
                  value={invoiceData.senderCity}
                  onChange={handleChange}
                  type="text"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] focus:outline-none rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                />
              </div>

              <div className="flex flex-col mr-4 col-span-1">
                <label className="text-gray-400 font-light">Post Code</label>
                <input
                  name="senderPostCode"
                  value={invoiceData.senderPostCode}
                  onChange={handleChange}
                  type="text"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                />
              </div>

              <div className="flex flex-col col-span-1">
                <label className="text-gray-400 font-light">Country</label>
                <input
                  name="senderCountry"
                  value={invoiceData.senderCountry}
                  onChange={handleChange}
                  type="text"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] focus:outline-none rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                />
              </div>
            </div>

            <h1 className="text-[#7c5dfa] my-4 mt-10 font-medium">Bill To</h1>

            <div className="grid grid-cols-3 mx-1 space-y-4">
              <div className="flex flex-col col-span-3">
                <label className="text-gray-400 font-light">Client Name</label>
                <input
                  name="clientName"
                  value={invoiceData.clientName}
                  onChange={handleChange}
                  type="text"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                />
              </div>

              <div className="flex flex-col col-span-3">
                <label className="text-gray-400 font-light">Client Email</label>
                <input
                  name="clientEmail"
                  value={invoiceData.clientEmail}
                  onChange={handleChange}
                  type="text"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                />
              </div>

              <div className="flex flex-col col-span-3">
                <label className="text-gray-400 font-light">
                  Street Address
                </label>
                <input
                  name="clientStreet"
                  value={invoiceData.clientStreet}
                  onChange={handleChange}
                  type="text"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                />
              </div>

              <div className="flex flex-col mr-4 col-span-1">
                <label className="text-gray-400 font-light">City</label>
                <input
                  name="clientCity"
                  value={invoiceData.clientCity}
                  onChange={handleChange}
                  type="text"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                />
              </div>

              <div className="flex flex-col mr-4 col-span-1">
                <label className="text-gray-400 font-light">Post Code</label>
                <input
                  name="clientPostCode"
                  value={invoiceData.clientPostCode}
                  onChange={handleChange}
                  type="text"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                />
              </div>

              <div className="flex flex-col col-span-1">
                <label className="text-gray-400 font-light">Country</label>
                <input
                  name="clientCountry"
                  value={invoiceData.clientCountry}
                  onChange={handleChange}
                  type="text"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800"
                />
              </div>
            </div>

            <div className="grid mx-1 grid-cols-2 mt-8">
              <div className="flex flex-col">
                <label className="text-gray-400 font-light">Invoice Date</label>
                <input
                  name="createdAt"
                  value={invoiceData.createdAt}
                  onChange={handleChange}
                  type="date"
                  className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white mr-4"
                />
              </div>

              <div className="mx-auto w-full">
                <label className="text-gray-400 font-light">
                  Payment Terms
                </label>
                <select
                  name="paymentTerms"
                  value={invoiceData.paymentTerms}
                  onChange={handleChange}
                  className="appearance-none w-full py-2 px-4 border-[.2px] rounded-lg focus:outline-none dark:bg-[#1e2139] dark:text-white dark:border-gray-800 focus:outline-purple-400 border-gray-300 select-status"
                >
                  <option value="" disabled>
                    Select Payment Terms
                  </option>
                  <option value="1">Net 1 Day</option>
                  <option value="7">Net 7 Days</option>
                  <option value="14">Net 14 Days</option>
                  <option value="30">Net 30 Days</option>
                </select>
              </div>
            </div>

            <div className="mx-1 mt-4 flex flex-col">
              <label className="text-gray-400 font-light">Description</label>
              <input
                name="description"
                value={invoiceData.description}
                onChange={handleChange}
                type="text"
                className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white"
              />
            </div>

            <h2 className="text-2xl text-gray-500 mt-10">Item List</h2>
            <div className="border-b pb-2 border-gray-300 mb-4">
              {/* AddItem Component Placeholder */}

              <div>
                {invoiceData.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex dark:text-white justify-between items-center"
                  >
                    <div className="flex flex-wrap">
                      <div className="flex px-2 py-2 flex-col items-start">
                        <h1>Item Name</h1>
                        <input
                          name="name"
                          placeholder="Item Name"
                          value={item.name}
                          onChange={(e) => handleChange(e, index)}
                          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                        />
                      </div>

                      <div className="flex px-2 py-2 flex-col items-start">
                        <h1>Qty.</h1>
                        <input
                          name="quantity"
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleChange(e, index)}
                          className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 max-w-[60px] border-gray-300 focus:outline-none dark:border-gray-800"
                        />
                      </div>

                      <div className="flex px-2 py-2 flex-col items-start">
                        <h1>Price</h1>
                        <input
                          name="price"
                          type="number"
                          value={item.price}
                          onChange={(e) => handleChange(e, index)}
                          className="dark:bg-[#1e2139] py-2 max-w-[100px] px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
                        />
                      </div>

                      <div className="flex px-2 py-2 flex-col items-start">
                        <h1>Total</h1>
                        <div className="max-w-[200px] dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
                          {/* Placeholder for total value */}20000
                        </div>
                      </div>
                      <button onClick={() => handleRemoveItem(index)}>
                        <TrashIcon className="text-gray-500 hover:text-red-500 cursor-pointer mt-4 h-6 w-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddItem}
              className="bg-gray-200 hover:opacity-80 mx-auto py-2 items-center dark:text-white dark:bg-[#252945] justify-center rounded-xl w-full mt-6"
            >
              + Add New Item
            </button>
          </div>

          <div className="flex justify-between">
            <div>
              <button
                onClick={() => setNewInvoice(false)}
                className="bg-gray-200 hover:opacity-80 mx-auto py-4 items-center dark:text-white dark:bg-[#252945] justify-center px-8 rounded-full"
              >
                Discard
              </button>
            </div>

            <div>
              <button
                onClick={handleSave}
                className="text-white hover:opacity-80 mx-auto py-4 items-center bg-[#7c5dfa] justify-center px-8 rounded-full"
              >
                Save & Send
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
