import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainPage from "../MainPage";
import { MemoryRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

jest.setTimeout(10000);

beforeEach(() => {
  fetchMock.resetMocks();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("renders MainPage with title and buttons", async () => {
  global.fetch = fetchMock;
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        http_code: 701,
        tag_id: 1,
        message: "Meh",
        tag_name: "Inexcusable",
      },
      {
        id: 8,
        http_code: 710,
        tag_id: 2,
        message: "PHP",
        tag_name: "Novelty Implementations",
      },
    ]),
    { status: 200 }
  );

  fetchMock.mockResponseOnce(
    JSON.stringify([
      { id: 1, name: "Inexcusable" },
      { id: 2, name: "Novelty Implementations" },
    ]),
    { status: 200 }
  );

  await act(async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    jest.runAllTimers();
  });

  await waitFor(() => {
    expect(screen.getByText(/Les Excuses de Dev/i)).toBeInTheDocument();
    expect(screen.getByText(/Générer une autre excuse/i)).toBeInTheDocument();
    expect(screen.getByText(/Ajouter une excuse/i)).toBeInTheDocument();
    expect(screen.getByText(/Meh/i)).toBeInTheDocument();
  });
});

test('opens modal when clicking "Ajouter une excuse"', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        http_code: 701,
        tag_id: 1,
        message: "Meh",
        tag_name: "Inexcusable",
      },
    ]),
    { status: 200, ok: true }
  );

  fetchMock.mockResponseOnce(
    JSON.stringify([
      { id: 1, name: "Inexcusable" },
      { id: 2, name: "Novelty Implementations" },
    ]),
    { status: 200, ok: true }
  );

  await act(async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    jest.advanceTimersByTime(5000); // Avance les timers pour fetchRandomExcuse
  });

  const addButton = await screen.findByText(/Ajouter une excuse/i); // Utilise findByText pour attendre le rendu
  await act(async () => {
    await userEvent.click(addButton);
  });

  await waitFor(
    () => {
      expect(
        screen.getByText(/Ajouter une nouvelle excuse/i)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/Tag/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    },
    { timeout: 6000 }
  );
});
