import axios, { AxiosError, AxiosResponse } from "axios";
import { GET_CONFIGURATIONS_URL, GET_CASE_LIST_URL } from "./endpoints"



export const loadConfigurations = async (reduxCall: any) => {
    await axios.get(GET_CONFIGURATIONS_URL)
    .then((res: AxiosResponse) => {
        reduxCall(res.data);
    })
    .catch((error: AxiosError) => {
        console.error('Error while fetching static configurations: ', error);
    });
}

export const loadCaseList = (reduxCall: any) => {
    axios
      .get(GET_CASE_LIST_URL)
      .then((res: AxiosResponse) => {
        reduxCall(res.data);
      })
      .catch((error: AxiosError) => {
        console.error("Error while fetching case list: ", error);
      });
}