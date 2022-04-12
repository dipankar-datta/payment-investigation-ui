import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { GET_CORRESPONDENCE_URL } from "../../util/endpoints";
import CorrespondenceForm from "./CorrespondenceForm";
import CorrespondenceTable from "./CorrespondenceTable";

export const Correspondence = (props: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "51%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
  };

  const [value, setValue] = React.useState("1");
  const [inboundCorrespondences, setInboundCorrespondences] =
    React.useState<any>([]);
  const [outboundCorrespondences, setOutboundCorrespondences] =
    React.useState<any>([]);

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
      setInboundCorrespondences(correspondence);
    }
  };

  return (
    <>
      <Box sx={{ ...style, width: "95%", height: "85%" }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Send Inbound" value="1" />
            <Tab label="Inbound" value="2" />
            <Tab label="Outbound" value="3" />
          </TabList>
          <TabPanel value="1">
            <CorrespondenceForm
              formSaveHandler={formSaveHandler}
              caseNumber={props.caseNumber}
            />
          </TabPanel>
          <TabPanel value="2">
            <CorrespondenceTable correspondences={inboundCorrespondences} />
          </TabPanel>
          <TabPanel value="3">
            <CorrespondenceTable correspondences={outboundCorrespondences} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Correspondence;
