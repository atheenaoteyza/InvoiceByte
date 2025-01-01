import moment from "moment";

function getPaymentDue(invoiceDate, numDays) {
  // Validate input
  if (typeof numDays !== "number" || numDays < 0) {
    throw new Error("numDays must be a non-negative number");
  }

  const today = moment(invoiceDate);
  console.log("Today (original):", today.format("YYYY-MM-DD"));

  const dueDate = today.clone().add(numDays, "days");
  console.log("Due Date (after add):", dueDate.format("YYYY-MM-DD"));

  return dueDate.format("YYYY-MM-DD");
}

export default getPaymentDue;
