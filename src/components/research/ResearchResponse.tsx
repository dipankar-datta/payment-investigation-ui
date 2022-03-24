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
      <TextField
        id="caseBook"
        label="Case Book"
        size="small"
        value={researchResponse.caseBook}
        variant="standard"
      />
      <TextField
        id="responseStatus"
        label="Response Status"
        size="small"
        value={researchResponse.responseStatus}
        variant="standard"
      ></TextField>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Pay Record" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
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
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
};

export default ResearchResponse;
