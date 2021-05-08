import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function createData(name) {
  return { name };
}
function TableComponent() {
  const [state, setState] = useState({
    rows: [],
  });
  const name = useSelector((state) => state.name);
  const email = useSelector((state) => state.email);
  const contact = useSelector((state) => state.contact);
  const dob = useSelector((state) => state.dob);
  const role = useSelector((state) => state.role);
  useEffect(async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "JsonStub-User-Key",
      "a11dea59-1923-4e45-83a8-6676bc896d75"
    );
    myHeaders.append(
      "JsonStub-Project-Key",
      "fd7f1136-86f3-4c0e-b3c4-627c73493a4e"
    );
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://jsonstub.com/orgs/1234/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setState({
          rows: result.data,
        });
      })
      .catch((error) => console.log("error", error));
  });

  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">DOB</TableCell>
              <TableCell align="right">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name ? row.name: "-" }
                </TableCell>
                <TableCell align="right">{row.email ? row.email: "-"}</TableCell>
                <TableCell align="right">{row.contact ? row.contact: "-"}</TableCell>
                <TableCell align="right">{row.dob ? row.dob: "-"}</TableCell>
                <TableCell align="right">{row.role ? row.role: "-"}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right">{email}</TableCell>
              <TableCell align="right">{contact}</TableCell>
              <TableCell align="right">{dob ? new Date(dob).toDateString(): ""}</TableCell>
              <TableCell align="right">{role}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableComponent;
