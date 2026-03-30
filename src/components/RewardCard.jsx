import React from "react";

export default function RewardCard({ label, value, sub }) {
  return (
    <div style={styles.card}>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>{value}</div>
      {sub && <div style={styles.sub}>{sub}</div>}
    </div>
  );
}

const styles = {
  card: {
    background: "#f5f5f3",
    borderRadius: 8,
    padding: "14px 16px",
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
  },
  value: {
    fontSize: 22,
    fontWeight: 500,
    color: "#111",
  },
  sub: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
};
