import axios, { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { GET_PAYMENT_RESPONSE_URL } from "../../util/endpoints";
import ResearchAuditTable from "./ResearchAuditTable";

const ResearchAudit = (props: any) => {
  const [tableData, setTableData] = useState();

  let auditFieldValue = props.auditFieldValue;

  useEffect(() => {
    if (auditFieldValue !== props.auditFieldValue || !tableData) {
      const paymentAuditUrl = getPaymentAuditUrl(props.auditByField, props.auditFieldValue);
      axios
        .get(paymentAuditUrl)
        .then((res: AxiosResponse) => {
          setTableData(res.data);
        })
        .catch((err: AxiosError) => {
          console.error(
            "Error while getting response audit data: ",
            err.message
          );
        });

      auditFieldValue = props.auditByField;
    }
  });

  return (
    <ResearchAuditTable
      loadAuditDetails={props.loadAuditDetails}
      payments={tableData || []}
    />
  );
};

export default ResearchAudit;

const getPaymentAuditUrl = (auditByField: string, fieldValue: string) => {
  switch (auditByField) {
    case "transactionReferenceNumber":
      return `${GET_PAYMENT_RESPONSE_URL}/${fieldValue}/audit`;
    case "caseNumber":
      return `${GET_PAYMENT_RESPONSE_URL}/${fieldValue}/audit/bycase`;
    default:
      return "";
  }
};
