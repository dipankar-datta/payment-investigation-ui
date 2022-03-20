import { PayQueryForm } from "./PayQueryForm";
import { PayResponse } from "./PayResponse";

export const PayQuery = (props: any) => {
  return (
    <span style={{textAlign: "center"}}>
      <h2>Query Payments</h2>
      <PayQueryForm/>
      <PayResponse />
    </span>
  );
};
