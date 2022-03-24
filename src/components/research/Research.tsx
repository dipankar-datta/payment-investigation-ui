import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { PaymentResponse } from "../../types/types";
import { GET_PAYMENT_RESPONSE_URL } from "../../util/endpoints";
import { ResearchForm } from "./ResearchForm";
import ResearchResponse from "./ResearchResponse";

export const Research = (props: any) => {

  const [payResponse, setPayResponse] = useState<PaymentResponse>();

  const searchFunction = (searchText: string) => {
    axios.get(`${GET_PAYMENT_RESPONSE_URL}/${searchText}`)
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        setPayResponse(res.data);
      }
    }).catch((error: AxiosError) => console.error(error));
  };

  return (
    <span style={{ textAlign: "center" }}>
      <h2>Research</h2>
      <div style={{ maxWidth: "500px", margin: "auto", display: "block" }}>
        <ResearchForm doSearch={searchFunction} />
      </div>
      <div style={{marginTop: "40px"}}>
        {payResponse ? <ResearchResponse paymentResponse={payResponse}/> : <>No Data</> }
        
      </div>
    </span>
  );
};
