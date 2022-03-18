import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { currencies } from "../../util/configurations";
import { CaseListMockData } from "../../util/mock-data";
import axios from "axios";
import { SAVE_CASE_URL } from "../../util/endpoints";

export const CaseFormRoutHandler = () => {
  const params = useParams();
  const navigate = useNavigate();
  const caseRecord = CaseListMockData.find(
    (caseItem: any) => caseItem.caseNumber === Number(params.caseNumber)
  );
  if (params.caseNumber && caseRecord) {
    return <CaseForm caseItem={caseRecord} />;
  } else {
    alert("Invalid Case Number");
    navigate("/cases");
  }

  return <></>;
};

export default function CaseForm(caseFormProps: any) {
  const navigate = useNavigate();
  const [caseState, setCaseState] = React.useState(caseFormProps.caseItem || {});

  const submitHandler = () => {
    axios.post(SAVE_CASE_URL, caseState)
    .then((res: any) => {
      console.log('Successfully Case Saved: ', res.data);
      alert("Successfully saved case");
      navigate("/cases");
    })
    .catch(error => {
      alert("Error while saving case");
      console.error("Error while saving case: ", error)
    });

    
    
  };

  const updateCase = (data: any) => {
    setCaseState({ ...caseState, ...data });
  };

  React.useEffect(() => {
    console.log('Case State: ', caseState);
  })

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <span
          style={{
            textAlign: "right",
            marginRight: "20px",
            float: 'right'
          }}
        >
          <Button onClick={e => navigate("/cases")} variant="outlined" size="medium">
            Back to Cases
          </Button>
        </span>
        <span>
          <h2 style={{ marginLeft: "10px" }}>Case Details</h2>
        </span>
      </div>

      <div>
        <TextField
          onChange={(e: any) => updateCase({ caseNumber: e.target.value })}
          id="caseNumber"
          label="Case Number"
          size="small"
          defaultValue={caseState.caseNumber}
        />
        <TextField
          onChange={(e: any) => updateCase({ bank: e.target.value })}
          id="bank"
          label="Bank"
          size="small"
          defaultValue={caseState.bank}
        />
        <TextField
          onChange={(e: any) => updateCase({ branch: e.target.value })}
          id="branch"
          label="Branch"
          size="small"
          defaultValue={caseState.branch}
        />
        <TextField
          onChange={(e: any) => updateCase({ inquiryId: e.target.value })}
          id="inquiryId"
          label="Inquiry ID"
          size="small"
          defaultValue={caseState.inquiryId}
        />
        <TextField
          onChange={(e: any) => updateCase({ inquirerName: e.target.value })}
          id="inquirerName"
          label="Inquirer Name"
          size="small"
          defaultValue={caseState.inquirerName}
        />
        <TextField
          onChange={(e: any) => updateCase({ inquirerIdType: e.target.value })}
          id="inquirerIdType"
          label="Inquiry ID Type"
          size="small"
          value={caseState.inquirerIdType}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Inquiry Date"
            value={caseState.inquiryDate || null}
            onChange={newValue => {
              updateCase({ inquiryDate: newValue });
            }}
            renderInput={(params) => (
              <TextField id="inquiryDate" size="small" {...params} />
            )}
          />
        </LocalizationProvider>
        <TextField
          onChange={(e: any) => updateCase({ inquirerAddress: e.target.value })}
          id="inquirerAddress"
          label="Inquirer Address"
          size="small"
          multiline
          maxRows={4}
          value={caseState.inquirerAddress}
        />
        <TextField
          id="assignedTo"
          label="Assigned To"
          size="small"
          value={caseState.assignedTo}
          onChange={(e: any) => updateCase({ assignedTo: e.target.value })}
        />
        <TextField
          id="inquiryRef"
          label="Inquiry Ref"
          size="small"
          value={caseState.inquiryRef}
          onChange={(e: any) => updateCase({ inquiryRef: e.target.value })}
        />
        <TextField
          id="status"
          label="Status"
          size="small"
          value={caseState.status}
          onChange={(e: any) => updateCase({ status: e.target.value })}
        />
        <TextField
          id="investigationType"
          label="Investigation Type"
          size="small"
          value={caseState.investigationType}
          onChange={(e: any) =>
            updateCase({ investigationType: e.target.value })
          }
        />
        <TextField
          id="priority"
          label="Priority"
          size="small"
          value={caseState.priority}
          onChange={(e: any) =>
            updateCase({ priority: e.target.value })
          }
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Close Date"
            value={caseState.closeDate || null}
            onChange={(newValue) => {
              updateCase({ closeDate: newValue });
            }}
            renderInput={(params) => (
              <TextField id="closeDate" size="small" {...params} />
            )}
          />
        </LocalizationProvider>
        <TextField
          id="amount"
          onChange={(e: any) => updateCase({ amount: e.target.value })}
          label="Amount"
          size="small"
          value={caseState.amount}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Post Date"
            value={caseState.postDate || null}
            onChange={(newValue) => {
              updateCase({ postDate: newValue });
            }}
            renderInput={(params) => (
              <TextField id="postDate" size="small" {...params} />
            )}
          />
        </LocalizationProvider>
        <TextField
          id="eqCurrency"
          select
          label="Enquiry Currency"
          value={caseState.eqCurrency}
          onChange={(e: any) => updateCase({ eqCurrency: e.target.value })}
          size="small"
        >
          {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="currency"
          select
          label="Currency"
          value={caseState.currency}
          onChange={(e: any) => updateCase({ currency: e.target.value })}
          size="small"
        >
          {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Value Date"
            value={caseState.valueDate || null}
            onChange={(newValue) => {
              updateCase({ valueDate: newValue });
            }}
            renderInput={(params) => (
              <TextField id="valueDate" size="small" {...params} />
            )}
          />
        </LocalizationProvider>
        <TextField
          id="ourRef"
          onChange={(e: any) => updateCase({ ourRef: e.target.value })}
          label="Our Ref"
          size="small"
          value={caseState.ourRef}
        />
        <TextField
          id="theirRef"
          onChange={(e: any) => updateCase({ theirRef: e.target.value })}
          label="Their Ref"
          size="small"
          value={caseState.theirRef}
        />
        <TextField
          id="uetr121"
          onChange={(e: any) => updateCase({ uetr121: e.target.value })}
          label="UETR (121)"
          size="small"
          value={caseState.uetr121}
        />
        <TextField
          id="enquirerAmount"
          onChange={(e: any) => updateCase({ enquirerAmount: e.target.value })}
          label="Enquirer Amount"
          size="small"
          value={caseState.enquirerAmount}
        />
        <TextField
          id="paidReceivedIndicator"
          onChange={(e: any) => updateCase({ paidReceivedIndicator: e.target.value })}
          label="Paid Recieved Indicator"
          size="small"
          value={caseState.paidReceivedIndicator}
        />
        <TextField
          id="originalInstructionRef"
          onChange={(e: any) => updateCase({ originalInstructionRef: e.target.value })}
          label="Original Instruction Ref"
          size="small"
          value={caseState.originalInstructionRef}
        />
        <TextField
          onChange={(e: any) => updateCase({ orderingInstAddress: e.target.value })}
          id="orderingInstAddress"
          label="Ordering Inst Address"
          size="small"
          multiline
          maxRows={4}
          value={caseState.orderingInstAddress}
        />
        <TextField
          id="orderingCustAddress"
          onChange={(e: any) => updateCase({ orderingCustAddress: e.target.value })}
          label="Ordering Cust Address"
          size="small"
          value={caseState.orderingCustAddress}
        />
        <TextField
          id="orderingCustId"
          onChange={(e: any) => updateCase({ orderingCustId: e.target.value })}
          label="Ordering Cust ID"
          size="small"
          value={caseState.orderingCustId}
        />
        <TextField
          id="orderingCustType"
          onChange={(e: any) => updateCase({ orderingCustType: e.target.value })}
          label="Ordering Cust Type"
          size="small"
          value={caseState.orderingCustType}
        />
        <TextField
          id="orderingCustName"
          onChange={(e: any) => updateCase({ orderingCustName: e.target.value })}
          label="Ordering Cust Name"
          size="small"
          value={caseState.orderingCustName}
        />
        <TextField
          id="beneficiaryAddress"
          onChange={(e: any) => updateCase({ beneficiaryAddress: e.target.value })}
          label="Beneficiary Address"
          size="small"
          value={caseState.beneficiaryAddress}
        />
        <TextField
          id="beneficiaryId"
          onChange={(e: any) => updateCase({ beneficiaryId: e.target.value })}
          label="Beneficiary ID"
          size="small"
          value={caseState.beneficiaryId}
        />
        <TextField
          id="beneficiaryType"
          onChange={(e: any) => updateCase({ beneficiaryType: e.target.value })}
          label="Beneficiary Type"
          size="small"
          value={caseState.beneficiaryType}
        />
        <TextField
          id="beneficiaryName"
          onChange={(e: any) => updateCase({ beneficiaryName: e.target.value })}
          label="Beneficiary Name"
          size="small"
          value={caseState.beneficiaryName}
        />
        <TextField
          id="instructedAmt"
          onChange={(e: any) => updateCase({ instructedAmt: e.target.value })}
          label="Instructed Amt"
          size="small"
          value={caseState.instructedAmt}
        />
        <TextField
          id="instructedCcy"
          select
          label="Instructed CCY"
          value={caseState.instructedCcy}
          onChange={(e: any) => updateCase({ instructedCcy: e.target.value })}
          size="small"
        >
          {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          onChange={(e: any) => updateCase({ receivingInstAddress: e.target.value })}
          id="receivingInstAddress"
          label="Receiving Inst Address"
          size="small"
          multiline
          maxRows={4}
          value={caseState.receivingInstAddress}
        />
        <TextField
          id="receivingInstId"
          onChange={(e: any) => updateCase({ receivingInstId: e.target.value })}
          label="Receiving Inst ID"
          size="small"
          value={caseState.receivingInstId}
        />
        <TextField
          id="receivingInstType"
          onChange={(e: any) => updateCase({ receivingInstType: e.target.value })}
          label="Receiving Inst Type"
          size="small"
          value={caseState.receivingInstType}
        />
        <TextField
          id="receivingInstName"
          onChange={(e: any) => updateCase({ receivingInstName: e.target.value })}
          label="Receiving Inst Name"
          size="small"
          value={caseState.receivingInstName}
        />
        <TextField
          id="sendingInstId"
          onChange={(e: any) => updateCase({ sendingInstId: e.target.value })}
          label="Sending Inst ID"
          size="small"
          value={caseState.sendingInstId}
        />
        <TextField
          id="sendingInstType"
          onChange={(e: any) => updateCase({ sendingInstType: e.target.value })}
          label="Sending Inst Type"
          size="small"
          value={caseState.sendingInstType}
        />
        <TextField
          id="sendingInstName"
          onChange={(e: any) => updateCase({ sendingInstName: e.target.value })}
          label="Sending Inst Name"
          size="small"
          value={caseState.sendingInstName}
        />
        <TextField
          id="defaultCurrency"
          select
          label="Default Currency"
          value={caseState.defaultCurrency}
          onChange={(e: any) => updateCase({ defaultCurrency: e.target.value })}
          size="small"
        >
          {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <div
          style={{
            textAlign: "center",
            margin: "20px 20px 10px 0",
            display: caseFormProps.caseItem ? "none" : "",
          }}
        >
          <Button onClick={submitHandler} variant="outlined" size="medium">
            Submit
          </Button>
        </div>
      </div>
    </Box>
  );
}
