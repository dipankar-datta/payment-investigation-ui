import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Box, Button, Modal, Tab } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { GET_CORRESPONDENCE_URL } from "../../util/endpoints";
import CorrespondenceForm from "./CorrespondenceForm";
import CorrespondenceTable from "./CorrespondenceTable";
import CloseIcon from "@mui/icons-material/Close";
import { CorrespondenceModalForm } from "./CorrespondenceModalForm";

export const Correspondence = (props: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "51%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
  };

  const [value, setValue] = React.useState("1");
  const [inboundCorrespondences, setInboundCorrespondences] =
    React.useState<any>([]);
  const [outboundCorrespondences, setOutboundCorrespondences] =
    React.useState<any>([]);
  const [correspondenceOpen, setCorrespondenceOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({});

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  let prevProps: any = {};
  let mounted = false;
  useEffect(() => {
    if (!mounted) {
      axios
        .get(`${GET_CORRESPONDENCE_URL}/${props.caseNumber}`)
        .then((res: AxiosResponse) => {
          const inbound = res.data.filter(
            (item: any) => item.inboundOutbound === "inbound"
          );
          const outbound = res.data.filter(
            (item: any) => item.inboundOutbound === "outbound"
          );
          setInboundCorrespondences(inbound);
          setOutboundCorrespondences(outbound);
        });
    }
    prevProps = { ...props };
    mounted = true;
  }, []);

  const formSaveHandler = (correspondence: any) => {
    if (correspondence.inboundOutbound === "inbound") {
      const inboundCopy = [...inboundCorrespondences];
      inboundCopy.push(correspondence);
      setInboundCorrespondences(inboundCopy);
    } else if (correspondence.inboundOutbound === "outbound") {
      const outboundCopy = [...outboundCorrespondences];
      outboundCopy.push(correspondence);
      setOutboundCorrespondences(outboundCopy);
    }
  };

  const rowSelectionHandler = (row: any) => {
    setSelectedRow(row);
    setCorrespondenceOpen(true);
  };

  return (
    <>
      <Box sx={{ ...style, width: "95%", height: "85%" }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Send Inbound" value="1" />
            <Tab label="Outbound" value="2" />
            <Tab label="Inbound" value="3" />
          </TabList>
          <TabPanel value="1">
            <CorrespondenceForm
              formSaveHandler={formSaveHandler}
              caseNumber={props.caseNumber}
            />
          </TabPanel>
          <TabPanel value="2">
            <CorrespondenceTable
              rowSelectionHandler={rowSelectionHandler}
              correspondences={outboundCorrespondences}
            />
          </TabPanel>
          <TabPanel value="3">
            <CorrespondenceTable
              rowSelectionHandler={rowSelectionHandler}
              correspondences={inboundCorrespondences}
            />
          </TabPanel>
        </TabContext>
      </Box>
      <Modal
        open={correspondenceOpen}
        onClose={(e) => setCorrespondenceOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "75%", height: "75%", padding: "20px" }}>
          <h3 style={{ float: "left" }} id="parent-modal-title">
            Correspondence
          </h3>
          <Button
            onClick={(e) => setCorrespondenceOpen(false)}
            variant="outlined"
            size="medium"
            style={{ float: "right", marginTop: "20px" }}
          >
            <CloseIcon />
          </Button>
          <div style={{marginTop: "80px"}}>
            <CorrespondenceModalForm correspondence={selectedRow} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Correspondence;
