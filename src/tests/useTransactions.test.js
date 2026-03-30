import { renderHook, act } from "@testing-library/react";
import { useTransactions } from "../hooks/useTransactions";
import * as api from "../api/transactionsApi";

jest.mock("../api/transactionsApi");

const MOCK_TRANSACTIONS = [
  {
    id: "T0001",
    customerId: "C001",
    customerName: "Customer 1",
    month: "Jan",
    monthLabel: "January 2026",
    date: "Jan 5, 2026",
    amount: 250,
    category: "Electronics",
    points: 3,
  },
  {
    id: "T0002",
    customerId: "C001",
    customerName: "Customer 1",
    month: "Jan",
    monthLabel: "January 2026",
    date: "Jan 12, 2026",
    amount: 80,
    category: "Grocery",
    points: 0,
  },
];

describe("useTransactions()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("starts in loading state with empty transactions", () => {
    api.fetchTransactions.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useTransactions());

    expect(result.current.loading).toBe(true);
    expect(result.current.transactions).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test("transitions to loaded state with data on success", async () => {
    api.fetchTransactions.mockResolvedValue(MOCK_TRANSACTIONS);

    const { result } = renderHook(() => useTransactions());
    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.transactions).toEqual(MOCK_TRANSACTIONS);
    expect(result.current.error).toBeNull();
  });

  test("sets error and stops loading when fetch rejects", async () => {
    const mockError = new Error("Network error");
    api.fetchTransactions.mockRejectedValue(mockError);

    const { result } = renderHook(() => useTransactions());

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError);
    expect(result.current.transactions).toEqual([]);
  });

  test("returns correct transaction count from mock data", async () => {
    api.fetchTransactions.mockResolvedValue(MOCK_TRANSACTIONS);

    const { result } = renderHook(() => useTransactions());
    await act(async () => {});

    expect(result.current.transactions).toHaveLength(2);
  });
});
