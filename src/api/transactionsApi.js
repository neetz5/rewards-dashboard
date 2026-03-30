//Sample customers list
const CUSTOMERS = [
  { id: "C001", name: "Customer 1" },
  { id: "C002", name: "Customer 2" },
  { id: "C003", name: "Customer 3" },
  { id: "C004", name: "Customer 4" },
];

//3 months list for selection
const MONTHS = [
  { key: "Jan", label: "January 2026" },
  { key: "Feb", label: "February 2026" },
  { key: "Mar", label: "March 2026" },
];

//Shopping categories for transaction list
const CATEGORIES = [
  "Electronics",
  "Grocery",
  "Travel",
  "Dining",
  "Fashion",
  "Utilities",
];

//Calculation Logic for the Reward  points
export function calcPoints(amountSpent) {
  const tier1Points =
    amountSpent >= 50 ? Math.floor(Math.min(amountSpent, 100) - 50) * 1 : 0;

  const tier2Points = amountSpent > 100 ? Math.floor(amountSpent - 100) * 2 : 0;

  return tier1Points + tier2Points;
}

//Sample data for transactions
function generateTransactions() {
  const transactions = [];
  let idCounter = 1;

  CUSTOMERS.forEach((customer) => {
    MONTHS.forEach((month) => {
      const txnCount = 5 + Math.floor(Math.random() * 8); // 5–12 per month

      for (let i = 0; i < txnCount; i++) {
        const amount = Math.round((50 + Math.random() * 400) * 100) / 100;
        const day = 1 + Math.floor(Math.random() * 28);

        transactions.push({
          id: "T" + String(idCounter++).padStart(4, "0"),
          customerId: customer.id,
          customerName: customer.name,
          month: month.key,
          monthLabel: month.label,
          date: `${month.key} ${day}, 2026`,
          amount,
          category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
          points: calcPoints(amount),
        });
      }
    });
  });

  return transactions;
}

//Using fetch API to get the transaction list
export async function fetchTransactions() {
  await new Promise((resolve) => setTimeout(resolve, 1800)); //mocking network latency
  return generateTransactions();
}
export { CUSTOMERS, MONTHS };
