import { Box, Button, MenuItem, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React from "react";
import { connect } from "react-redux";
import { SAVE_CORRESPONDENCE_URL } from "../../util/endpoints";

const CorrespondenceForm = (props: any) => {
  const [correspondence, setCorrespondence] = React.useState(
    props.correspondence
  );

  const updateCorrespondence = (data: any) => {
    setCorrespondence({ ...correspondence, ...data });
  };

  const submitHandler = () => {
    const finalData = {
      ...correspondence,
      inboundOutbound: "inbound",
      casebook: props.caseNumber,
    };
    axios
      .post(SAVE_CORRESPONDENCE_URL, finalData)
      .then((res: AxiosResponse) => {
        alert("Successfully sent correspondence");
        props.formSaveHandler(res.data);
        setCorrespondence(null);
      })
      .catch((err) => {
        alert("Error sending correspondence");
      });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            onChange={(e: any) =>
              updateCorrespondence({ casebook: e.target.value })
            }
            id="casebook"
            label="Case Number"
            size="small"
            defaultValue={props.caseNumber}
          />
          <TextField
            id="correspondenceType"
            onChange={(e: any) =>
              updateCorrespondence({ correspondenceType: e.target.value })
            }
            label="Correspondence Type"
            size="small"
            value={props.correspondence?.correspondenceType}
            select
          >
            {props.configurations.receiving_inst_type.map(buildMenuItems)}
          </TextField>
          <br />
          <TextField
            id="outlined-multiline-flexible"
            label="Message"
            multiline
            style={{ width: "100%" }}
            rows={10}
            value={props.correspondence?.message}
            onChange={(e: any) =>
              updateCorrespondence({ message: e.target.value })
            }
          />
        </div>
      </Box>
      <Button
        onClick={submitHandler}
        variant="outlined"
        size="medium"
        style={{ margin: "auto", display: "table" }}
      >
        Send
      </Button>
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any): any => {
  return {
    configurations: state.configurations.staticConfigurations,
    caseNumber: ownProps.caseNumber,
    correspondence: ownProps.correspondence,
    formSaveHandler: ownProps.formSaveHandler,
  };
};

export default connect(mapStateToProps, null)(CorrespondenceForm);

const buildMenuItems = (option: any) => {
  return (
    <MenuItem key={option.fieldKey} value={option.fieldValue}>
      {option.fieldValue}
    </MenuItem>
  );
};
