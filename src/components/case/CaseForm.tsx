import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GET_CASE_URL, SAVE_CASE_URL } from "../../util/endpoints";
import { connect } from "react-redux";
import * as _ from "lodash";
import LoadingButton from "@mui/lab/LoadingButton";
import ResearchAudit from "../research/ResearchAudit";
import ResearchResponse from "../research/ResearchResponse";

const CaseFormRoutHandler = (props: any) => {
  const params = useParams();
  const navigate = useNavigate();
  let caseRecordFound = props.caseList.find(
    (caseItem: any) => String(caseItem.id) === params.id
  );
  const [caseRecord, setCaseRecord]: any = useState(caseRecordFound);
  const [status, setStatus]: any = React.useState("loading");
  const [auditResponseDetails, setAuditResponseDetails] = useState<any>();

  const auditClickHandler = () => {
    setStatus("audit");
  }

  const loadAuditDetails = (auditDetails: any) => {
    setAuditResponseDetails(auditDetails);
    setStatus("auditdetails");
  };

  useEffect(() => {
    if (caseRecord) {
      setStatus("loaded");
    } else {
      axios
        .get(`${GET_CASE_URL}/${params.id}`)
        .then((res: AxiosResponse) => {
          setCaseRecord(res.data);
          setStatus(_.isEmpty(res.data) ? "empty" : "loaded");
        })
        .catch((error: AxiosError) => {
          console.error(
            `Error while fetching case by id ${params.id} : `,
            error
          );
        });
    }
  }, [caseRecord]);

  if (status === "loading") {
    return (
      <LoadingButton loading={true} variant="outlined" disabled>
        disabled
      </LoadingButton>
    );
  } else if (status === "empty") {
    alert("Data not available. Moving back to cases");
    navigate("/cases");
  } else if (status === "loaded") {
    return (
      <CaseForm auditClickHandler={auditClickHandler} caseItem={caseRecord} configurations={props.configurations} />
    );
  } else if (status === "audit") {
    return <ResearchAudit auditByField="caseNumber" auditFieldValue={caseRecord.caseNumber} loadAuditDetails={loadAuditDetails} ></ResearchAudit>
  } else if (status === "auditdetails") {
    return <ResearchResponse paymentResponse={auditResponseDetails} />
  }

  return <></>;
};

const mapStateToPropsCaseFormRoutHandler = (state: any): any => {
  return {
    caseList: state.case.list,
    configurations: state.configurations.staticConfigurations,
  };
};

export const CaseFormRoutHandlerConnected = connect(
  mapStateToPropsCaseFormRoutHandler,
  null
)(CaseFormRoutHandler);

function CaseForm(caseFormProps: any) {
  const navigate = useNavigate();
  const [caseState, setCaseState] = React.useState(
    caseFormProps.caseItem || {}
  );

  const saveHandler = () => {
    axios
      .post(SAVE_CASE_URL, caseState)
      .then((res: any) => {
        console.log("Successfully Case Saved: ", res.data);
        alert("Successfully saved case");
        navigate("/cases");
      })
      .catch((error) => {
        alert("Error while saving case");
        console.error("Error while saving case: ", error);
      });
  };

  const updateCase = (data: any) => {
    setCaseState({ ...caseState, ...data });
  };

  const auditLogHandler = () => {
    caseFormProps.auditClickHandler();
  }

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
            float: "right",
          }}
        >
          <Button
            onClick={auditLogHandler}
            variant="outlined"
            size="medium"
            style={{marginRight: "20px"}}
          >
            Audit Log
          </Button>
          <Button
            onClick={(e) => navigate("/cases")}
            variant="outlined"
            size="medium"
          >
            Back to Cases
          </Button>
        </span>
        <span>
          <h2>Case Details</h2>
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
          select
          defaultValue={caseState.bank}
        >
          {caseFormProps.configurations.bank.map(buildMenuItems)}
        </TextField>

        <TextField
          onChange={(e: any) => updateCase({ branch: e.target.value })}
          id="branch"
          label="Branch"
          size="small"
          select
          defaultValue={caseState.branch}
        >
          {caseFormProps.configurations.branch.map(buildMenuItems)}
        </TextField>
        <TextField
          onChange={(e: any) => updateCase({ inquiryId: e.target.value })}
          id="inquiryId"
          label="Inquiry ID"
          size="small"
          defaultValue={caseState.inquiryId}
          select
        >
          {caseFormProps.configurations.inquiry_id.map(buildMenuItems)}
        </TextField>
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
            onChange={(newValue) => {
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
          select
          value={caseState.assignedTo}
          onChange={(e: any) => updateCase({ assignedTo: e.target.value })}
        >
          {caseFormProps.configurations.assign_to.map(buildMenuItems)}
        </TextField>
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
          select
        >
          {caseFormProps.configurations.status.map(buildMenuItems)}
        </TextField>
        <TextField
          id="investigationType"
          label="Investigation Type"
          size="small"
          value={caseState.investigationType}
          onChange={(e: any) =>
            updateCase({ investigationType: e.target.value })
          }
          select
        >
          {caseFormProps.configurations.investigation_type.map(buildMenuItems)}
        </TextField>
        <TextField
          id="priority"
          label="Priority"
          size="small"
          value={caseState.priority}
          onChange={(e: any) => updateCase({ priority: e.target.value })}
          select
        >
          {caseFormProps.configurations.priority.map(buildMenuItems)}
        </TextField>
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
          {caseFormProps.configurations.eq_currency.map(buildMenuItems)}
        </TextField>
        <TextField
          id="currency"
          select
          label="Currency"
          value={caseState.currency}
          onChange={(e: any) => updateCase({ currency: e.target.value })}
          size="small"
        >
          {caseFormProps.configurations.currency.map(buildMenuItems)}
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
          onChange={(e: any) =>
            updateCase({ paidReceivedIndicator: e.target.value })
          }
          label="Paid Recieved Indicator"
          size="small"
          value={caseState.paidReceivedIndicator}
        />
        <TextField
          id="originalInstructionRef"
          onChange={(e: any) =>
            updateCase({ originalInstructionRef: e.target.value })
          }
          label="Original Instruction Ref"
          size="small"
          value={caseState.originalInstructionRef}
        />
        <TextField
          onChange={(e: any) =>
            updateCase({ orderingInstAddress: e.target.value })
          }
          id="orderingInstAddress"
          label="Ordering Inst Address"
          size="small"
          multiline
          maxRows={4}
          value={caseState.orderingInstAddress}
        />
        <TextField
          id="orderingCustAddress"
          onChange={(e: any) =>
            updateCase({ orderingCustAddress: e.target.value })
          }
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
          onChange={(e: any) =>
            updateCase({ orderingCustType: e.target.value })
          }
          label="Ordering Cust Type"
          size="small"
          value={caseState.orderingCustType}
        />
        <TextField
          id="orderingCustName"
          onChange={(e: any) =>
            updateCase({ orderingCustName: e.target.value })
          }
          label="Ordering Cust Name"
          size="small"
          value={caseState.orderingCustName}
        />
        <TextField
          id="beneficiaryAddress"
          onChange={(e: any) =>
            updateCase({ beneficiaryAddress: e.target.value })
          }
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
          {caseFormProps.configurations.instructed_currency.map(buildMenuItems)}
        </TextField>
        <TextField
          onChange={(e: any) =>
            updateCase({ receivingInstAddress: e.target.value })
          }
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
          select
        >
          {caseFormProps.configurations.receiving_inst_id.map(buildMenuItems)}
        </TextField>
        <TextField
          id="receivingInstType"
          onChange={(e: any) =>
            updateCase({ receivingInstType: e.target.value })
          }
          label="Receiving Inst Type"
          size="small"
          value={caseState.receivingInstType}
          select
        >
          {caseFormProps.configurations.receiving_inst_type.map(buildMenuItems)}
        </TextField>
        <TextField
          id="receivingInstName"
          onChange={(e: any) =>
            updateCase({ receivingInstName: e.target.value })
          }
          label="Receiving Inst Name"
          size="small"
          value={caseState.receivingInstName}
        />
        <TextField
          id="sendingInstAddress"
          onChange={(e: any) =>
            updateCase({ sendingInstAddress: e.target.value })
          }
          label="Sending Inst Address"
          size="small"
          value={caseState.sendingInstAddress}
          select
        >
          {caseFormProps.configurations.sending_inst_address.map(
            buildMenuItems
          )}
        </TextField>
        <TextField
          id="sendingInstId"
          onChange={(e: any) => updateCase({ sendingInstId: e.target.value })}
          label="Sending Inst ID"
          size="small"
          value={caseState.sendingInstId}
          select
        >
          {caseFormProps.configurations.sending_inst_id.map(buildMenuItems)}
        </TextField>
        <TextField
          id="sendingInstType"
          onChange={(e: any) => updateCase({ sendingInstType: e.target.value })}
          label="Sending Inst Type"
          size="small"
          value={caseState.sendingInstType}
          select
        >
          {caseFormProps.configurations.sending_inst_type.map(buildMenuItems)}
        </TextField>
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
          {caseFormProps.configurations.default_currency.map(buildMenuItems)}
        </TextField>
        <div
          style={{
            textAlign: "center",
            margin: "20px 20px 10px 0"
          }}
        >
          <Button onClick={saveHandler} variant="outlined" size="medium">
            Save
          </Button>
        </div>
      </div>
    </Box>
  );
}

const mapStateToPropsCaseForm = (state: any): any => {
  return {
    configurations: state.configurations.staticConfigurations,
  };
};

export const CaseFormConnected = connect(
  mapStateToPropsCaseForm,
  null
)(CaseForm);

const buildMenuItems = (option: any) => {
  return (
    <MenuItem key={option.fieldKey} value={option.fieldValue}>
      {option.fieldValue}
    </MenuItem>
  );
};
