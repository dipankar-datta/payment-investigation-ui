import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComponentNone from "./components/ComponentNone";
import { Case } from "./components/case/Case";
import { Header } from "./components/Header";
import CaseForm, { CaseFormRoutHandler } from "./components/case/CaseForm";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/cases" element={<Case />} />
        <Route path="/cases/new" element={<CaseForm />} />
        <Route path="/cases/:caseNumber" element={<CaseFormRoutHandler />} />
        <Route path="*" element={<ComponentNone />} />
        <Route path="/" element={<Case />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
