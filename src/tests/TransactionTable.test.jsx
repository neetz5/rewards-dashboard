import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionTable from "../components/TransactionTable";

const makeTransaction = (overrides = {}) => ({
  id: "T0001",
  customerId: "C001",
  customerName: "Customer 1",
  month: "Jan",
  date: "Jan 5, 2026",
  amount: 250.0,
  category: "Electronics",
  points: 3,
  ...overrides,
});

describe("TransactionTable", () => {
  test("renders all column headers", () => {
    render(<TransactionTable transactions={[]} />);
    ["ID", "Customer", "Date", "Category", "Amount", "Points"].forEach((h) => {
      expect(screen.getByText(h)).toBeInTheDocument();
    });
  });

  test("renders a row for each transaction", () => {
    const txns = [
      makeTransaction({ id: "T0001", customerName: "Customer 1" }),
      makeTransaction({ id: "T0002", customerName: "Customer 2" }),
    ];
    render(<TransactionTable transactions={txns} />);
    expect(screen.getByText("T0001")).toBeInTheDocument();
    expect(screen.getByText("T0002")).toBeInTheDocument();
    expect(screen.getByText("Customer 1")).toBeInTheDocument();
    expect(screen.getByText("Customer 2")).toBeInTheDocument();
  });

  test("shows '—' pill for non-qualifying transactions", () => {
    render(
      <TransactionTable
        transactions={[makeTransaction({ amount: 150, points: 0 })]}
      />
    );
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  test("renders the transaction date", () => {
    render(
      <TransactionTable
        transactions={[makeTransaction({ date: "Feb 14, 2026" })]}
      />
    );
    expect(screen.getByText("Feb 14, 2026")).toBeInTheDocument();
  });

  test("renders the category", () => {
    render(
      <TransactionTable
        transactions={[makeTransaction({ category: "Travel" })]}
      />
    );
    expect(screen.getByText("Travel")).toBeInTheDocument();
  });
});
