import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = (props: any) => {
    const navigate = useNavigate();
  return (
    <Box
     
    sx={{ '& button': { m: 1 } }}
    >
      <div style={{ textAlign: "center" }}>
          <h2>Please select from below options</h2>
        <Button onClick={e => navigate("/cases")} variant="outlined" size="large">
          Cases
        </Button>
        <Button onClick={e => navigate("/payquery")} variant="outlined" size="large">
          Research
        </Button>
      </div>
    </Box>
  );
};
