import { useState, useMemo } from "react";
import { useTransactions } from "./hooks/useTransactions";
import { CUSTOMERS, MONTHS } from "./api/transactionsApi";
import RewardCard from "./components/RewardCard";
import TransactionTable from "./components/TransactionTable";

function App() {
  const { transactions, loading, error } = useTransactions();
  const [filterCustomer, setFilterCustomer] = useState("ALL");
  const [filterMonth, setFilterMonth] = useState("ALL");
  const filtered = useMemo(
    () =>
      transactions.filter(
        (t) =>
          (filterCustomer === "ALL" || t.customerId === filterCustomer) &&
          (filterMonth === "ALL" || t.month === filterMonth)
      ),
    [transactions, filterCustomer, filterMonth]
  );
  const metrics = useMemo(() => {
    const totalSpend = filtered.reduce((s, t) => s + t.amount, 0);
    const totalPoints = filtered.reduce((s, t) => s + t.points, 0);
    const qualifying = filtered.filter((t) => t.points > 0).length;
    return { totalSpend, totalPoints, qualifying };
  }, [filtered]);

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Fetching transactions from API…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <p style={{ color: "#c00" }}>Failed to load: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="App" style={styles.root}>
      <h1 style={styles.heading}>Rewards Dashboard</h1>
      <p style={styles.subheading}>
        3-month transaction period | 2 pts awarded per transaction over $100 | 1
        pt awarderd per transaction between $50 & $100
      </p>
      <div style={styles.filterBar}>
        <label style={styles.filterLabel}>Customer:</label>
        <select
          style={styles.select}
          value={filterCustomer}
          onChange={(e) => setFilterCustomer(e.target.value)}
        >
          <option value="ALL">All customers</option>
          {CUSTOMERS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <label style={styles.filterLabel}>Month:</label>
        <select
          style={styles.select}
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="ALL">All months</option>
          {MONTHS.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          marginBottom: "1.5rem",
        }}
      >
        <RewardCard
          label="Total transactions"
          value={filtered.length}
          sub="across 3 months"
        />
        <RewardCard
          label="Total spend"
          value={`$${metrics.totalSpend.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`}
          sub="all customers"
        />
        <RewardCard
          label="Qualifying transactions"
          value={metrics.qualifying}
          sub="$50-$100 & >$100 threshold"
        />
        <RewardCard
          label="Rewards earned"
          value={`${metrics.totalPoints} pts`}
          sub="@ pts per transaction"
        />
      </div>
      <div>
        <TransactionTable transactions={filtered} />
      </div>
    </div>
  );
}

const styles = {
  root: {
    maxWidth: 900,
    minWidth: "fit-content",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    fontFamily: "sans-serif",
    color: "#111",
  },
  heading: { fontSize: 24, fontWeight: 500, marginBottom: 4 },
  subheading: { fontSize: 14, color: "#888", marginBottom: "1.5rem" },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: 12,
    fontFamily: "sans-serif",
  },
  spinner: {
    width: 28,
    height: 28,
    border: "2px solid #e0e0e0",
    borderTopColor: "#888",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: { fontSize: 13, color: "#aaa" },
  filterBar: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "1rem",
  },
  filterLabel: { fontSize: 13, color: "#666" },
  select: {
    fontSize: 13,
    padding: "5px 10px",
    borderRadius: 8,
    border: "0.5px solid #ccc",
    background: "#fff",
    color: "#111",
  },
};

export default App;
