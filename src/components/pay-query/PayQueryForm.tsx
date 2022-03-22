import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ariaLabel = { "aria-label": "description" };

export const PayQueryForm = (props: any) => {
  return (
    <div style={{ maxWidth: "500px", margin: "auto"}}>
      <div style={{ width: "80%", float: "left" }}>
        <TextField
          placeholder="Please enter Sender reference Number "
          fullWidth
          id="fullWidth"
          size="small"
        />
      </div>
      <span style={{ width: "20%", float: "right" }}>
        <Button style={{paddingRight: "5px"}} variant="outlined" size="large" startIcon={<SearchIcon />} />
      </span>
    </div>
  );
};
