import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import ComponentNone from "./components/ComponentNone";
import { Case } from "./components/case/Case";
import { Header } from "./components/Header";
import { CaseFormConnected, CaseFormRoutHandlerConnected } from "./components/case/CaseForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setConfigurations } from "./redux/actions";
import { loadConfigurations } from "./util/api-calls";


function App(props: any) {
  if (props && props.actions) {
    loadAppStartupData(props);
}    
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/cases" element={<Case />} />
        <Route path="/cases/new" element={<CaseFormConnected />} />
        <Route path="/cases/:caseNumber" element={<CaseFormRoutHandlerConnected />} />
        <Route path="*" element={<ComponentNone />} />
        <Route path="/" element={<Case/>}></Route>
      </Routes>
    </HashRouter>
  );
}

const actions = {
  setConfigurations: (configurations: any) => setConfigurations(configurations)
}

const mapDispatchToProps = (dispatch: any) => {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(null, mapDispatchToProps)(App);

const loadAppStartupData = (props: any) => {
  loadConfigurations(props.actions.setConfigurations);
}

