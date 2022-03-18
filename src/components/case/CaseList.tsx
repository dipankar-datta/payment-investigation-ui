import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as _ from "lodash";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { setCaseList } from "../../redux/actions";
import { connect } from "react-redux";
import { GET_CASE_LIST_URL } from "../../util/endpoints";
import { bindActionCreators } from "redux";
import { parseDate } from "../../util/common-functions";

const caseListColumns = [
  {
    id: "caseNumber",
    label: "Case Number",
    minWidth: 100,
    valuePath: "caseNumber",
  },
  { id: "bank", label: "Bank", minWidth: 100, valuePath: "bank" },
  { id: "branch", label: "Branch", minWidth: 100, valuePath: "branch" },
  {
    id: "inquirerName",
    label: "Inquirer Name",
    minWidth: 100,
    format: (value: any) => value?.name,
    valuePath: "inquirerName",
  },
  {
    id: "inquirerIdType",
    label: "Inquirer ID Type",
    minWidth: 100,
    format: (value: any) => value?.idType,
    valuePath: "inquirerIdType",
  },
  {
    id: "inquiryId",
    label: "Inquiry ID",
    minWidth: 100,
    format: (value: any) => value?.id,
    valuePath: "inquiryId",
  },
  {
    id: "inquiryDate",
    label: "Inquiry Date",
    minWidth: 100,
    format: (value: any) => parseDate(value?.inquiryDate),
    valuePath: "inquiryDate",
  },
  {
    id: "inquirerAddress",
    label: "inquirer Address",
    minWidth: 100,
    format: (value: any) => value?.inquirerAddress,
    valuePath: "inquirerAddress",
  },
  {
    id: "assignedTo",
    label: "Assigned To",
    minWidth: 100,
    valuePath: "assignedTo",
  },
  { id: "status", label: "Status", minWidth: 100, valuePath: "status" },
  { id: "amount", label: "Amount", minWidth: 100, valuePath: "amount" },
  {
    id: "eqCurrency",
    label: "Enquiry Currency",
    minWidth: 100,
    valuePath: "eqCurrency",
  },
  { id: "currency", label: "Currency", minWidth: 100, valuePath: "currency" },
  { id: "tranRef", label: "Tran Ref", minWidth: 100, valuePath: "tranRef" },
];

const CaseList = (props: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(GET_CASE_LIST_URL)
      .then((res: AxiosResponse) => {
        props.actions.setCaseList(res.data);
      })
      .catch((error: AxiosError) => {
        console.error("Error while fetching case list: ", error);
      });
  });

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCaseSelection = (column: any, row: any) => {
    if (column.id === "caseNumber" && row) {
      navigate(`/cases/${row.caseNumber}`);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {caseListColumns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.cases
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {caseListColumns.map((column: any) => {
                      const value = _.get(row, column.valuePath, null);
                      return (
                        <TableCell
                          onClick={(e) => handleCaseSelection(column, row)}
                          key={column.id}
                          align={column.align}
                        >
                            {column.format ? column.format(row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.cases.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};


const mapStateToProps = (state: any) => {
  return {
    cases: state.case.list,
  }
}

const actions = {
  setCaseList: (caseList: any) => setCaseList(caseList)
}

const mapDispatchToProps = (dispatch: any) => {
  return {actions: bindActionCreators(actions, dispatch)};
}
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     setCaseList: (caseList: any) => dispatch(setCaseList(caseList))
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(CaseList)