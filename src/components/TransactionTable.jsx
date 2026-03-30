import React from "react";

//Transaction table displaying list as per the selection of customers/month
export default function TransactionTable({ transactions }) {
  const sorted = [...transactions].sort((a, b) => b.amount - a.amount);

  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {["ID", "Customer", "Date", "Category", "Amount", "Points"].map(
              (h, i) => (
                <th
                  key={h}
                  style={{
                    ...styles.th,
                    textAlign: i >= 4 ? "right" : "left",
                  }}
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {sorted.map((t) => (
            <tr key={t.id} style={styles.tr}>
              <td
                style={{ ...styles.td, fontFamily: "monospace", color: "#888" }}
              >
                {t.id}
              </td>
              <td style={styles.td}>{t.customerName}</td>
              <td style={styles.td}>{t.date}</td>
              <td style={styles.td}>{t.category}</td>
              <td style={{ ...styles.td, textAlign: "right" }}>
                ${t.amount.toFixed(2)}
              </td>
              <td style={{ ...styles.td, textAlign: "right" }}>
                {t.points > 0 ? (
                  <span style={styles.pillEarned}>+{t.points} pts</span>
                ) : (
                  <span style={styles.pillZero}>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#fff",
    border: "0.5px solid #e0e0e0",
    borderRadius: 12,
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
  th: {
    padding: "8px 12px",
    fontSize: 11,
    fontWeight: 500,
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    borderBottom: "0.5px solid #ddd",
    background: "#fff",
  },
  tr: {
    borderBottom: "0.5px solid #f0f0f0",
  },
  td: {
    padding: "9px 12px",
    color: "#111",
    verticalAlign: "middle",
  },
  pillEarned: {
    display: "inline-flex",
    padding: "2px 8px",
    borderRadius: 999,
    background: "#EAF3DE",
    color: "#27500A",
    fontSize: 11,
    fontWeight: 500,
  },
  pillZero: {
    display: "inline-flex",
    padding: "2px 8px",
    borderRadius: 999,
    background: "#f5f5f3",
    color: "#aaa",
    fontSize: 11,
  },
};
