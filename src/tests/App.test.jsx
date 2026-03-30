import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import * as api from "../api/transactionsApi";

jest.mock("../api/transactionsApi", () => ({
  ...jest.requireActual("../api/transactionsApi"),
  fetchTransactions: jest.fn(),
}));

// set of transactions covering all customers & months
const ALL_TRANSACTIONS = [
  {
    id: "T0001",
    customerId: "C001",
    customerName: "Customer 1",
    month: "Jan",
    monthLabel: "January 2026",
    date: "Jan 5, 2026",
    amount: 300,
    category: "Electronics",
    points: 3,
  },
  {
    id: "T0002",
    customerId: "C001",
    customerName: "Customer 1",
    month: "Jan",
    monthLabel: "January 2026",
    date: "Jan 10, 2026",
    amount: 100,
    category: "Grocery",
    points: 0,
  },
  {
    id: "T0003",
    customerId: "C001",
    customerName: "Customer 1",
    month: "Feb",
    monthLabel: "February 2026",
    date: "Feb 3, 2026",
    amount: 250,
    category: "Travel",
    points: 3,
  },
  {
    id: "T0004",
    customerId: "C001",
    customerName: "Customer 1",
    month: "Mar",
    monthLabel: "March 2026",
    date: "Mar 1, 2026",
    amount: 180,
    category: "Dining",
    points: 0,
  },
  {
    id: "T0005",
    customerId: "C002",
    customerName: "Customer 2",
    month: "Jan",
    monthLabel: "January 2026",
    date: "Jan 7, 2026",
    amount: 220,
    category: "Fashion",
    points: 3,
  },
  {
    id: "T0006",
    customerId: "C002",
    customerName: "Customer 2",
    month: "Feb",
    monthLabel: "February 2026",
    date: "Feb 14, 2026",
    amount: 90,
    category: "Utilities",
    points: 0,
  },
  {
    id: "T0007",
    customerId: "C002",
    customerName: "Customer 2",
    month: "Mar",
    monthLabel: "March 2026",
    date: "Mar 20, 2026",
    amount: 400,
    category: "Electronics",
    points: 3,
  },
  {
    id: "T0008",
    customerId: "C003",
    customerName: "Customer 3",
    month: "Jan",
    monthLabel: "January 2026",
    date: "Jan 2, 2026",
    amount: 60,
    category: "Grocery",
    points: 0,
  },
  {
    id: "T0009",
    customerId: "C003",
    customerName: "Customer 3",
    month: "Feb",
    monthLabel: "February 2026",
    date: "Feb 8, 2026",
    amount: 70,
    category: "Dining",
    points: 0,
  },
  {
    id: "T0010",
    customerId: "C003",
    customerName: "Customer 3",
    month: "Mar",
    monthLabel: "March 2026",
    date: "Mar 15, 2026",
    amount: 80,
    category: "Travel",
    points: 0,
  },
  {
    id: "T0011",
    customerId: "C004",
    customerName: "Customer 4",
    month: "Jan",
    monthLabel: "January 2026",
    date: "Jan 18, 2026",
    amount: 210,
    category: "Electronics",
    points: 3,
  },
  {
    id: "T0012",
    customerId: "C004",
    customerName: "Customer 4",
    month: "Feb",
    monthLabel: "February 2026",
    date: "Feb 22, 2026",
    amount: 350,
    category: "Fashion",
    points: 3,
  },
  {
    id: "T0013",
    customerId: "C004",
    customerName: "Customer 4",
    month: "Mar",
    monthLabel: "March 2026",
    date: "Mar 28, 2026",
    amount: 500,
    category: "Utilities",
    points: 3,
  },
];

describe("App ", () => {
  beforeEach(() => {
    api.fetchTransactions.mockResolvedValue(ALL_TRANSACTIONS);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //  Loading state

  test("shows loading spinner before data arrives", () => {
    api.fetchTransactions.mockReturnValue(new Promise(() => {}));
    render(<App />);
    expect(
      screen.getByText(/Fetching transactions from API/i)
    ).toBeInTheDocument();
  });

  //  Loaded state

  test("shows the dashboard heading after data loads", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("Rewards Dashboard")).toBeInTheDocument()
    );
  });

  test("displays correct total transaction count (13)", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText("13")).toBeInTheDocument());
  });

  //  Error state
  test("shows error message when fetch fails", async () => {
    api.fetchTransactions.mockRejectedValue(new Error("Server unavailable"));
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText(/Server unavailable/i)).toBeInTheDocument()
    );
  });

  //  Customer filter

  test("filters by customer — shows only that customer's transactions", async () => {
    render(<App />);
    await waitFor(() => screen.getByText("Rewards Dashboard"));

    const customerSelect = screen.getByDisplayValue("All customers");
    fireEvent.change(customerSelect, { target: { value: "C001" } });

    expect(screen.getByText("4")).toBeInTheDocument();
  });

  test("filters by customer — qualifying count updates (C001 has 2 qualifying)", async () => {
    render(<App />);
    await waitFor(() => screen.getByText("Rewards Dashboard"));

    fireEvent.change(screen.getByDisplayValue("All customers"), {
      target: { value: "C001" },
    });

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  // Month filter

  test("filters by month — transaction count drops", async () => {
    render(<App />);
    await waitFor(() => screen.getByText("Rewards Dashboard"));

    fireEvent.change(screen.getByDisplayValue("All months"), {
      target: { value: "Jan" },
    });

    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
