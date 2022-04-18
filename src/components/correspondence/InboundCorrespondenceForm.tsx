import { Box, MenuItem, TextField, Button } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { connect } from "react-redux";
import { SAVE_CORRESPONDENCE_URL } from "../../util/endpoints";

export const InboundCorrepondenceRoutHandler = (props: any) => {
  let pwd = null;
  if (props) {
    pwd = window.prompt("Please enter password");
  }
  return pwd ? <InboundCorrepondenceConnected password={pwd} /> : <></>;
};

const InboundCorrepondence = (props: any) => {
  const [correspondence, setCorrespondence] = React.useState<any>({});
  const [adminPassword, setAdminPassowrd] = React.useState<any>(props.password);
  const updateCorrespondence = (data: any) => {
    setCorrespondence({ ...correspondence, ...data });
  };

  const submitHandler = () => {
      if (!correspondence.casebook) {
          alert("Please enter casebook number");
      } else if (!correspondence.correspondenceType) {
          alert("Please enter Correspondence Type")
      } else if (!correspondence.message) {
          alert("Please enter message");
      } else if (!adminPassword) {
            alert("Please enter admin password");
      } else {
        const finalData = {
            ...correspondence,
            inboundOutbound: "inbound",
            password: adminPassword
          };
          axios
            .post(SAVE_CORRESPONDENCE_URL, finalData)
            .then((res: AxiosResponse) => {
              alert("Successfully sent correspondence");
              setCorrespondence({});
            })
            .catch((err: any) => {
                if (err.response.status === 401) {
                    if (window.confirm("Invalid Access. Would you like to enter password again ? ")) {
                        setAdminPassowrd(window.prompt("Please enter admin password."));
                    }
                } else {
                    alert("Error sending correspondence");
                }
              
            });
      }
    
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
    password: ownProps.password,
  };
};

const InboundCorrepondenceConnected = connect(
  mapStateToProps,
  null
)(InboundCorrepondence);

const buildMenuItems = (option: any) => {
  return (
    <MenuItem key={option.fieldKey} value={option.fieldValue}>
      {option.fieldValue}
    </MenuItem>
  );
};
