import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import ComponentNone from "./components/ComponentNone";
import { Case } from "./components/case/Case";
import { Header } from "./components/Header";
import {
  CaseFormConnected,
  CaseFormRoutHandlerConnected,
} from "./components/case/CaseForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setConfigurations } from "./redux/actions";
import { loadConfigurations } from "./util/api-calls";
import { PayQuery } from "./components/pay-query/PayQuery";
import { Home } from "./components/Home";

function App(props: any) {
  if (props && props.actions) {
    loadAppStartupData(props);
  }
  return (
    <HashRouter>
      <Header />
      <div style={{ padding: "20px 25px 0 25px" }}>
        <Routes>
          <Route path="/cases" element={<Case />} />
          <Route path="/cases/new" element={<CaseFormConnected />} />
          <Route
            path="/cases/:id"
            element={<CaseFormRoutHandlerConnected />}
          />
          <Route path="/payquery" element={<PayQuery />} />
          <Route path="*" element={<ComponentNone />} />
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

const actions = {
  setConfigurations: (configurations: any) => setConfigurations(configurations),
};

const mapDispatchToProps = (dispatch: any) => {
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(null, mapDispatchToProps)(App);

const loadAppStartupData = (props: any) => {
  loadConfigurations(props.actions.setConfigurations);
};
