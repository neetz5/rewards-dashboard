import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Fetching transactions from API/);
  expect(linkElement).toBeInTheDocument();
});
