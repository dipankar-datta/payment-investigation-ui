import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";

const ResearchAuditTable = (props: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    {
      id: "transactionReferenceNumber",
      label: "Transaction Reference Number",
      minWidth: 100,
    },
    {
      id: "caseBook",
      label: "Case Book Number",
      minWidth: 100,
    },
    {
      id: "responseStatus",
      label: "Response Status",
      minWidth: 100,
    },
    {
      id: "accessDateTime",
      label: "Access Date Time",
      minWidth: 100,
    },
  ];

  const handleRowSelection = (column: any, row: any) => {
      props.loadAuditDetails(row);
  };

  return (
    <div>
      <h2 style={{ margin: "0 0 10px 0" }}>Research Audit Log</h2>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
              {props.payments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column: any) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            onClick={(e) => handleRowSelection(column, row)}
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
          count={props.payments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ResearchAuditTable;
