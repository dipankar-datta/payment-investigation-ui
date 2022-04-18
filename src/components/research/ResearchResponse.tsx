import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TextField } from "@mui/material";
import { PaymentResponse } from "../../types/types";

const ResearchResponse = (props: { paymentResponse: PaymentResponse }) => {
  const [value, setValue] = React.useState("1");
  const [researchResponse, setResearchResponse] = React.useState(
    props.paymentResponse || {}
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        typography: "body1",
        "& > :not(style)": { m: 2 },
      }}
    >
      <div style={{ marginTop: "30px" }}>
        <TextField
          id="caseBook"
          label="Case Book"
          size="small"
          value={researchResponse.caseBook}
          variant="standard"
          style={{ marginRight: "20px" }}
        />

        <TextField
          id="responseStatus"
          label="Response Status"
          size="small"
          value={researchResponse.responseStatus}
          variant="standard"
          style={{ marginRight: "20px" }}
        ></TextField>
      </div>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Pay Record" value="1" />
            <Tab label="Message Credit" value="2" />
            <Tab label="Message Debit" value="3" />
            <Tab label="Message Status" value="4" />
            <Tab label="Swift In" value="5" />
            <Tab label="Swift Out" value="6" />
            <Tab label="Swift Message" value="7" />
            <Tab label="Swift Out 2" value="8" />
            <Tab label="Swift In GPII 199" value="9" />
            <Tab label="Swift oUT GPII 199" value="10" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="transactionDate"
              label="Transaction Date"
              size="small"
              value={researchResponse.transactionDate}
            />
            <TextField
              id="transactionReferenceNumber"
              label="Transaction Reference Number"
              size="small"
              value={researchResponse.transactionReferenceNumber}
            ></TextField>

            <TextField
              id="currentAmount"
              label="CurrentAmount"
              size="small"
              value={researchResponse.currentAmount}
            ></TextField>

            <TextField
              id="exchangeRate"
              label="Exchange Rate"
              size="small"
              value={researchResponse.exchangeRate}
            ></TextField>

            <TextField
              id="paymentChannelReference"
              label="Payment Channel Reference"
              size="small"
              value={researchResponse.paymentChannelReference}
            ></TextField>

            <TextField
              id="swiftMsgCategorySubType"
              label="Swift Message Category Sub Type"
              size="small"
              value={researchResponse.swiftMsgCategorySubType}
            ></TextField>

            <TextField
              id="swiftMsgType"
              label="Swift Message Type"
              size="small"
              value={researchResponse.swiftMsgType}
            ></TextField>

            <TextField
              id="paymentDate"
              label="Payment Date"
              size="small"
              value={researchResponse.paymentDate}
            ></TextField>

            <TextField
              id="stpFlag"
              label="STP Flag"
              size="small"
              value={researchResponse.stpFlag}
            ></TextField>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="creditPartyAcct"
              label="Credit Party Acct"
              size="small"
              value={researchResponse.creditPartyAcct}
            ></TextField>

            <TextField
              id="creditPartyName"
              label="Credit Party Name"
              size="small"
              value={researchResponse.creditPartyName}
            ></TextField>

            <TextField
              id="creditPartyAddr1"
              label="Credit Party Address 1"
              size="small"
              value={researchResponse.creditPartyAddr1}
            ></TextField>

            <TextField
              id="creditPartyAddr2"
              label="Credit Party Address 2"
              size="small"
              value={researchResponse.creditPartyAddr2}
            ></TextField>

            <TextField
              id="creditPartyAddr3"
              label="Credit Party Address 3"
              size="small"
              value={researchResponse.creditPartyAddr3}
            ></TextField>

            <TextField
              id="creditAmount"
              label="Credit Amount"
              size="small"
              value={researchResponse.creditAmount}
            ></TextField>

            <TextField
              id="creditValueDate"
              label="Credit Value Date"
              size="small"
              value={researchResponse.creditValueDate}
            ></TextField>

            <TextField
              id="beneficiaryName"
              label="Beneficiary Name"
              size="small"
              value={researchResponse.beneficiaryName}
            ></TextField>

            <TextField
              id="beneficiaryAddr1"
              label="Beneficiary Address 1"
              size="small"
              value={researchResponse.beneficiaryAddr1}
            ></TextField>

            <TextField
              id="beneficiaryAddr2"
              label="Beneficiary Address 2"
              size="small"
              value={researchResponse.beneficiaryAddr2}
            ></TextField>

            <TextField
              id="beneficiaryAddr3"
              label="Beneficiary Address 3"
              size="small"
              value={researchResponse.beneficiaryAddr3}
            ></TextField>

            <TextField
              id="remittanceInfo2"
              label="Remittance Info 2"
              size="small"
              value={researchResponse.remittanceInfo2}
            ></TextField>

            <TextField
              id="remittanceInfo3"
              label="Remittance Info 3"
              size="small"
              value={researchResponse.remittanceInfo3}
            ></TextField>

            <TextField
              id="remittanceInfo4"
              label="Remittance Info 4"
              size="small"
              value={researchResponse.remittanceInfo4}
            ></TextField>
          </Box>
        </TabPanel>
        <TabPanel value="3">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="debitPartyAcct"
              label="Debit Party Acct"
              size="small"
              value={researchResponse.debitPartyAcct}
            ></TextField>

            <TextField
              id="debitPartyName"
              label="Debit Party Name"
              size="small"
              value={researchResponse.debitPartyName}
            ></TextField>

            <TextField
              id="debitPartyAddr1"
              label="Debit Party Address 1"
              size="small"
              value={researchResponse.debitPartyAddr1}
            ></TextField>

            <TextField
              id="debitPartyAddr2"
              label="Debit Party Address 2"
              size="small"
              value={researchResponse.debitPartyAddr2}
            ></TextField>

            <TextField
              id="debitPartyAddr3"
              label="Debit Party Address 3"
              size="small"
              value={researchResponse.debitPartyAddr3}
            ></TextField>

            <TextField
              id="debitAmount"
              label="Debit Amount"
              size="small"
              value={researchResponse.debitAmount}
            ></TextField>

            <TextField
              id="debitValueDate"
              label="Debit Value Date"
              size="small"
              value={researchResponse.debitValueDate}
            ></TextField>

            <TextField
              id="sendingBankIdType"
              label="Sending Bank ID Type"
              size="small"
              value={researchResponse.sendingBankIdType}
            ></TextField>

            <TextField
              id="sendingBankId"
              label="Sending Bank ID"
              size="small"
              value={researchResponse.sendingBankId}
            ></TextField>

            <TextField
              id="sendingBankName"
              label="Sending Bank Name"
              size="small"
              value={researchResponse.sendingBankName}
            ></TextField>

            <TextField
              id="sendingBankAddr1"
              label="Sending Bank Address 1"
              size="small"
              value={researchResponse.sendingBankAddr1}
            ></TextField>

            <TextField
              id="sendingBankAddr2"
              label="Sending Bank Address 2"
              size="small"
              value={researchResponse.sendingBankAddr2}
            ></TextField>

            <TextField
              id="sendingBankAddr3"
              label="Sending Bank Address 3"
              size="small"
              value={researchResponse.sendingBankAddr3}
            ></TextField>

            <TextField
              id="sendingBankTranRef"
              label="Sending Bank Transaction Reference"
              size="small"
              value={researchResponse.sendingBankTranRef}
            ></TextField>

            <TextField
              id="orderingBankIdType"
              label="Ordering Bank ID Type"
              size="small"
              value={researchResponse.orderingBankIdType}
            ></TextField>

            <TextField
              id="orderingBankId"
              label="Ordering Bank ID"
              size="small"
              value={researchResponse.orderingBankId}
            ></TextField>

            <TextField
              id="orderingBankName"
              label="Ordering Bank Name"
              size="small"
              value={researchResponse.orderingBankName}
            ></TextField>

            <TextField
              id="orderingBankAddr1"
              label="Ordering Bank Address 1"
              size="small"
              value={researchResponse.orderingBankAddr1}
            ></TextField>

            <TextField
              id="orderingBankAddr2"
              label="Ordering Bank Address 2"
              size="small"
              value={researchResponse.orderingBankAddr2}
            ></TextField>

            <TextField
              id="orderingBankAddr3"
              label="Ordering Bank Address 3"
              size="small"
              value={researchResponse.orderingBankAddr3}
            ></TextField>
          </Box>
        </TabPanel>
        <TabPanel value="4">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="createdBy"
              label="Created By"
              size="small"
              value={researchResponse.createdBy}
            ></TextField>

            <TextField
              id="createdDateTime"
              label="Created Date Time"
              size="small"
              value={researchResponse.createdDateTime}
            ></TextField>

            <TextField
              id="transactionStatus"
              label="Transaction Status"
              size="small"
              value={researchResponse.transactionStatus}
            ></TextField>
          </Box>
        </TabPanel>

        <TabPanel value="5">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="swiftInMsgIdentifier"
              label="Message Identifier"
              size="small"
              value={researchResponse.swiftInMsgIdentifier}
            ></TextField>

            <TextField
              id="swiftInMsgType"
              label="Message Type"
              size="small"
              value={researchResponse.swiftInMsgType}
            ></TextField>

            <TextField
              id="swiftInField20"
              label="Field 20"
              size="small"
              value={researchResponse.swiftInField20}
            ></TextField>

            <TextField
              id="swiftInField21"
              label="Field 21"
              size="small"
              value={researchResponse.swiftInField21}
            ></TextField>

            <TextField
              id="swiftInCurrAmount"
              label="Current Amount"
              size="small"
              value={researchResponse.swiftInCurrAmount}
            ></TextField>

            <TextField
              id="swiftInValueDate"
              label="Value Date"
              size="small"
              value={researchResponse.swiftInValueDate}
            ></TextField>

            <TextField
              id="swiftInCbaBic"
              label="CBA BIC"
              size="small"
              value={researchResponse.swiftInCbaBic}
            ></TextField>

            <TextField
              id="swiftInExternalPartyBic"
              label="External Party BIC"
              size="small"
              value={researchResponse.swiftInExternalPartyBic}
            ></TextField>

            <TextField
              id="swiftInStatus"
              label="Status"
              size="small"
              value={researchResponse.swiftInStatus}
            ></TextField>

            <TextField
              id="swiftInMsgSequence"
              label="Message Sequence"
              size="small"
              value={researchResponse.swiftInMsgSequence}
            ></TextField>

            <TextField
              id="swiftInDateTime"
              label="Date Time"
              size="small"
              value={researchResponse.swiftInDateTime}
            ></TextField>

            <TextField
              id="swiftInSource"
              label="Source"
              size="small"
              value={researchResponse.swiftInSource}
            ></TextField>

            <TextField
              id="swiftInMsgResponse"
              label="Message Response"
              size="small"
              value={researchResponse.swiftInMsgResponse}
            ></TextField>

            <TextField
              id="swiftInSessionNo"
              label="Session Number"
              size="small"
              value={researchResponse.swiftInSessionNo}
            ></TextField>

            <TextField
              id="swiftInSwiftMsg"
              label="Swift Message"
              size="small"
              value={researchResponse.swiftInSwiftMsg}
            ></TextField>
          </Box>
        </TabPanel>
        <TabPanel value="6">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="swiftOutMsgIdentifier"
              label="Message Identifier"
              size="small"
              value={researchResponse.swiftOutMsgIdentifier}
            ></TextField>

            <TextField
              id="swiftOutMsgType"
              label="Message Type"
              size="small"
              value={researchResponse.swiftOutMsgType}
            ></TextField>

            <TextField
              id="swiftOutField20"
              label="Field 20"
              size="small"
              value={researchResponse.swiftOutField20}
            ></TextField>
            <TextField
              id="swiftOutField21"
              label="Field 21"
              size="small"
              value={researchResponse.swiftOutField21}
            ></TextField>
            <TextField
              id="swiftOutCurrAmount"
              label="Current Amount"
              size="small"
              value={researchResponse.swiftOutCurrAmount}
            ></TextField>
            <TextField
              id="swiftOutValueDate"
              label="Value Date"
              size="small"
              value={researchResponse.swiftOutValueDate}
            ></TextField>
            <TextField
              id="swiftOutRemitter"
              label="Remitter"
              size="small"
              value={researchResponse.swiftOutRemitter}
            ></TextField>
            <TextField
              id="swiftOutBnp"
              label="BNP"
              size="small"
              value={researchResponse.swiftOutBnp}
            ></TextField>
            <TextField
              id="swiftOutCbaBic"
              label="CBA BIC"
              size="small"
              value={researchResponse.swiftOutCbaBic}
            ></TextField>
            <TextField
              id="swiftOutExternalPartyBic"
              label="External Party BIC"
              size="small"
              value={researchResponse.swiftOutExternalPartyBic}
            ></TextField>
            <TextField
              id="swiftOutStatus"
              label="Status"
              size="small"
              value={researchResponse.swiftOutStatus}
            ></TextField>
            <TextField
              id="swiftOutMsgId"
              label="Message ID"
              size="small"
              value={researchResponse.swiftOutMsgId}
            ></TextField>
            <TextField
              id="swiftOutMsgSequence"
              label="Message Sequence"
              size="small"
              value={researchResponse.swiftOutMsgSequence}
            ></TextField>
            <TextField
              id="swiftOutDateTime"
              label="Date Time"
              size="small"
              value={researchResponse.swiftOutDateTime}
            ></TextField>
            <TextField
              id="swiftOutSource"
              label="Source"
              size="small"
              value={researchResponse.swiftOutSource}
            ></TextField>
            <TextField
              id="swiftOutMsgResponse"
              label="Message Response"
              size="small"
              value={researchResponse.swiftOutMsgResponse}
            ></TextField>
            <TextField
              id="swiftOutSessionNo"
              label="Session Number"
              size="small"
              value={researchResponse.swiftOutSessionNo}
            ></TextField>
            <TextField
              id="swiftOutCorrespondentCtry"
              label="Correspondent Country"
              size="small"
              value={researchResponse.swiftOutCorrespondentCtry}
            ></TextField>
            <TextField
              id="swiftOutMsgUserRef"
              label="Message User Reference"
              size="small"
              value={researchResponse.swiftOutMsgUserRef}
            ></TextField>
            <TextField
              id="swiftOutCreatedBy"
              label="Created By"
              size="small"
              value={researchResponse.swiftOutCreatedBy}
            ></TextField>
            <TextField
              id="swiftOutCreatedDateTime"
              label="Created Date Time"
              size="small"
              value={researchResponse.swiftOutCreatedDateTime}
            ></TextField>
          </Box>
        </TabPanel>
        <TabPanel value="7">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="swiftMsg"
              label="Swift Message"
              size="small"
              multiline
              rows={10}
              value={researchResponse.swiftMsg}
            ></TextField>
            <TextField
              id="swiftCreatedBy"
              label="Created By"
              size="small"
              value={researchResponse.swiftCreatedBy}
            ></TextField>
            <TextField
              id="swiftCreatedDateTime"
              label="Created Date Time"
              size="small"
              value={researchResponse.swiftCreatedDateTime}
            ></TextField>
          </Box>
        </TabPanel>
        <TabPanel value="8">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="swiftOut2"
              label="Swift Out 2"
              size="small"
              value={researchResponse.swiftOut2}
            ></TextField>
          </Box>
        </TabPanel>
        <TabPanel value="9">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="swiftInGp2_199"
              label="Swift In GPII 199"
              size="small"
              multiline
              rows={10}
              value={researchResponse.swiftInGp2_199}
            ></TextField>
          </Box>
        </TabPanel>
        <TabPanel value="10">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="swiftOutGgp2_199"
              label="Swift Out GPII 199"
              size="small"
              multiline
              rows={10}
              value={researchResponse.swiftOutGgp2_199}
            ></TextField>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ResearchResponse;
