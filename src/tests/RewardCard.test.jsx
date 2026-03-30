import React from "react";
import { render, screen } from "@testing-library/react";
import RewardCard from "../components/RewardCard";

describe("RewardCard", () => {
  test("renders the label", () => {
    render(<RewardCard label="Total transactions" value={40} />);
    expect(screen.getByText("Total transactions")).toBeInTheDocument();
  });

  test("renders a numeric value", () => {
    render(<RewardCard label="Rewards earned" value={25} />);
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  test("renders a string value", () => {
    render(<RewardCard label="Total spend" value="$10,450" />);
    expect(screen.getByText("$10,450")).toBeInTheDocument();
  });

  test("renders the sub-label when provided", () => {
    render(
      <RewardCard
        label="Qualifying transactions"
        value={10}
        sub="$50-$100 & >$100 threshold"
      />
    );
    expect(screen.getByText("$50-$100 & >$100 threshold")).toBeInTheDocument();
  });
});
