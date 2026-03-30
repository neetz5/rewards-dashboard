import { useState, useEffect } from "react";
import { fetchTransactions } from "../api/transactionsApi";

/** Custom hook for the transaction async API
 * transactions for the array of transaction objects
 * loading is to show a loader simulating API latency
 * error as to show an error from API call
 */
export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchTransactions()
      .then((data) => {
        if (!cancelled) {
          setTransactions(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { transactions, loading, error };
}
