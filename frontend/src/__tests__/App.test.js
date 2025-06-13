import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders App with MainPage route", () => {
  render(<App />);
  expect(screen.getByText(/Les Excuses de Dev/i)).toBeInTheDocument();
});
