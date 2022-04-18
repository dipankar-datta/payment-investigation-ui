import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as _ from "lodash";

const CorrespondenceTable = (props: any) => {
  const correspondenceColumns = [
    {
      id: "casebook",
      label: "Case Number",
      minWidth: 100,
      valuePath: "casebook",
    },
    {
      id: "correspondenceType",
      label: "Correspondence Type",
      minWidth: 100,
      valuePath: "correspondenceType",
    },
    {
      id: "inboundOutbound",
      label: "Message Type",
      minWidth: 100,
      valuePath: "inboundOutbound",
    },
    {
      id: "message",
      label: "Message",
      minWidth: 200,
      valuePath: "message",
      format: (data: any) => {
        return data && data.message && data.message.length > 20
          ? data.message.slice(0, 20) + "..."
          : data?.message;
      },
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelection = (column: any, row: any) => {
    console.log(column, row);
    if (props.rowSelectionHandler) {
      props.rowSelectionHandler(row);
    }
  };
  return (
    <div>
      <h2 style={{ margin: "0 0 10px 0" }}>Case List</h2>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {correspondenceColumns.map((column) => (
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
              {props.correspondences
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {correspondenceColumns.map((column: any) => {
                        const value = _.get(row, column.valuePath, null);
                        return (
                          <TableCell
                            onClick={(e) => handleSelection(column, row)}
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
          count={props.correspondences.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default CorrespondenceTable;
