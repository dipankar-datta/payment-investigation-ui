import { Link } from "react-router-dom";
import CaseList from "./CaseList";
import Button from "@mui/material/Button";

export const Case = () => {
  return (
    <div>
      <div style={{ textAlign: "right", margin: "20px 20px 10px 0" }}>
        <Link to="/cases/new">
          <Button variant="outlined" size="medium">
            Create new Case
          </Button>
        </Link>
      </div>
      <CaseList />
    </div>
  );
};
