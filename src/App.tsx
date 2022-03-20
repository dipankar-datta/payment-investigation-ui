import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import ComponentNone from "./components/ComponentNone";
import { Case } from "./components/case/Case";
import { Header } from "./components/Header";
import CaseForm, { CaseFormRoutHandlerConnected } from "./components/case/CaseForm";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/cases" element={<Case />} />
        <Route path="/cases/new" element={<CaseForm />} />
        <Route path="/cases/:caseNumber" element={<CaseFormRoutHandlerConnected />} />
        <Route path="*" element={<ComponentNone />} />
        <Route path="/" element={<Case />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
