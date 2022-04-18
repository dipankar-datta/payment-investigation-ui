import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export type ResearchFormProps = {
  doSearch: (searchText: string) => void;
}

export const ResearchForm = (props: ResearchFormProps) => {

  const [searchText, setSearchText] = useState<string>("");


  const callParentSearchCallBack = () => {
    props.doSearch(searchText);
  };

  return (
    <div>
      <div style={{ width: "80%", float: "left" }}>
        <TextField
          onChange={(e: any) => setSearchText(e.target.value)}
          placeholder="Please enter Sender reference Number "
          fullWidth
          id="fullWidth"
          size="small"
          value={searchText}
        />
      </div>
      <span style={{ width: "20%", float: "right" }}>
        <Button onClick={e => callParentSearchCallBack()} style={{paddingRight: "5px"}} variant="outlined" size="large" startIcon={<SearchIcon />} />
      </span>
    </div>
  );
};
