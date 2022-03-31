import axios, { AxiosError, AxiosResponse } from "axios";
import { table } from "console";
import { useState } from "react";
import { GET_PAYMENT_RESPONSE_URL } from "../../util/endpoints";
import ResearchAuditTable from "./ResearchAuditTable";

const ResearchAudit = (props: any) => {

    const [tableData, setTableData] = useState();

    axios.get(`${GET_PAYMENT_RESPONSE_URL}/${props.transactionReferenceNumber}/audit`)
    .then((res: AxiosResponse) => {
        setTableData(res.data);
    })
    .catch((err: AxiosError) => {
        console.error("Error while getting response audit data: ", err.message);
    })

    return <ResearchAuditTable loadAuditDetails={props.loadAuditDetails} payments={tableData} />
}

export default ResearchAudit;