import { Button } from "@mui/material";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { PaymentResponse } from "../../types/types";
import { GET_PAYMENT_RESPONSE_URL } from "../../util/endpoints";
import ResearchAudit from "./ResearchAudit";
import { ResearchForm } from "./ResearchForm";
import ResearchResponse from "./ResearchResponse";

export const Research = (props: any) => {
  const [payResponse, setPayResponse] = useState<PaymentResponse>();
  const [screen, setScreen] = useState<
    "searchform" | "audittable" | "auditdetails"
  >("searchform");
  const [paymentsAuditLog, setPaymentsAuditLog] = useState<any>();
  const [auditResponseDetails, setAuditResponseDetails] = useState<any>();

  const searchFunction = (searchText: string) => {
    axios
      .get(`${GET_PAYMENT_RESPONSE_URL}/${searchText}`)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setPayResponse(res.data);
        }
      })
      .catch((error: AxiosError) => console.error(error));
  };

  const responseAuditLogButtonClickHandler = (e: any) => {
    setScreen("audittable");
  };

  const loadAuditDetails = (auditDetails: any) => {
    setAuditResponseDetails(auditDetails);
    setScreen("auditdetails");
  };

  return (
    <span style={{ textAlign: "center" }}>
      <h2>Research</h2>
      <div style={{ maxWidth: "500px", margin: "auto", display: "block" }}>
        <ResearchForm doSearch={searchFunction} />
      </div>
      <div style={{ marginTop: "75px" }}>
        {screen === "searchform" ? (
          payResponse ? (
            <>
              <div>
                <Button
                  onClick={responseAuditLogButtonClickHandler}
                  variant="outlined"
                  size="large"
                >
                  Response Audit Logs
                </Button>
              </div>
              <ResearchResponse paymentResponse={payResponse} />
            </>
          ) : (
            <div style={{ textAlign: "left" }}>No Data</div>
          )
        ) : (
          <></>
        )}

        {screen === "audittable" ? (
          <ResearchAudit
            loadAuditDetails={loadAuditDetails}
            transactionReferenceNumber={payResponse?.transactionReferenceNumber}
          />
        ) : (
          <></>
        )}

        {screen === "auditdetails" ? (
          payResponse ? (
            <>
              <Button
                variant="outlined"
                onClick={(e) => setScreen("audittable")}
              >
                {" "}
                Back to Research Audit Log{" "}
              </Button>
              <ResearchResponse paymentResponse={payResponse} />
            </>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </span>
  );
};
