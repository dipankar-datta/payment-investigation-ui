import React from "react";
import { Box, TextField } from "@mui/material";

export const CorrespondenceModalForm = (props: any) => {
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
            id="casebook"
            label="Case Number"
            size="small"
            defaultValue={props.correspondence?.casebook}
            InputProps={{
                readOnly: true,
              }}
          />
          <TextField
            id="correspondenceType"
            label="Correspondence Type"
            size="small"
            value={props.correspondence?.correspondenceType}
            InputProps={{
                readOnly: true,
              }}
          ></TextField>
          <br />
          <TextField
            id="outlined-multiline-flexible"
            label="Message"
            multiline
            style={{ width: "100%" }}
            rows={10}
            value={props.correspondence?.message}
            InputProps={{
                readOnly: true,
              }}
          />
        </div>
      </Box>
    </>
  );
};
