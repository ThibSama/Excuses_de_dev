import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";
import LostPage from "./LostPage";
import HttpCodePage from "./HttpCodePage";
import NotFoundPage from "./NotFoundPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/lost" element={<LostPage />} />
        <Route path="/:http_code" element={<HttpCodePage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
