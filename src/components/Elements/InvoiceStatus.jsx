import React from "react";

export function InvoiceStatus({ type }) {
  const classNames = {
    paid: ["text-[#33d69f] bg-[#33d69f0f]", "bg-[#33d69f]", "px-7"], // Add px-7 for paid
    pending: ["text-[#ff8f00] bg-[#ff8f000f]", "bg-[#ff8f00]", "px-4"], // Add px-4 for pending
    draft: ["text-[#dfe3fa] bg-[#dfe3fa0f]", "bg-[#dfe3fa]", "px-4"], // Add px-4 for draft
  };

  return (
    <div
      className={`${
        type === "paid"
          ? classNames.paid[0] + " " + classNames.paid[2] // Apply px-8 for paid
          : type === "pending"
          ? classNames.pending[0] + " " + classNames.pending[2] // Apply px-4 for pending
          : classNames.draft[0] + " " + classNames.draft[2] // Apply px-4 for draft
      } flex justify-center space-x-2 rounded-lg items-center py-2`}
    >
      <div
        className={`h-3 w-3 rounded-full  ${
          type === "paid"
            ? classNames.paid[1]
            : type === "pending"
            ? classNames.pending[1]
            : classNames.draft[1]
        } `}
      />
      <p>{type}</p>
    </div>
  );
}
