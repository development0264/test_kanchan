import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      width: theme.spacing(40),
      textAlign: "center",
      //   height: theme.spacing(30)
      height: "auto",
    },
    rootGrid: {
      flexGrow: 1,
    },
    button: {
      "& > *": {
        margin: theme.spacing(2),
      },
    },
  },
}));

function Forms() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    role: "",
  });
  const [error, setErrorState] = useState({
    email_error_text: null,
    role_error_text: null,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    if (name == "email") {
      if (event.target.value === "" || !event.target.value) {
        setErrorState({
          email_error_text: null,
        });
      } else {
        validateEmail(event.target.value);
      }
    }
    if (name == "role") {
      validateRole(event.target.name);
    }
  };

  function validateEmail(email) {
    var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    if (re.test(email)) {
      setErrorState({
        email_error_text: null,
      });
      return true;
    } else {
      setErrorState({
        email_error_text: "Sorry, this is not a valid email",
      });
      return false;
    }
  }
  function validateRole(role) {
    if (role == "") {
      setErrorState({
        role_error_text: "Please select the role.",
      });
      return false;
    } else {
      setErrorState({
        role_error_text: null,
      });
      return true;
    }
  }
  async function onSubmit() {
    if (validateEmail(state.email) && validateRole(state.role)) {
      dispatch({ type: "submit", payload: state });
      setState({
        name: "",
        email: "",
        contact: "",
        dob: "",
        role: "",
      });
    }
  }

  return (
    <div className={classes.root} style={{ justifyContent: "center" }}>
      <Paper elevation={3}>
        <label className="form-title">User Form</label>
        <div className={classes.rootGrid} style={{ marginTop: "10px" }}>
          <Grid container spacing={2} xs={12}>
            <Grid item xs={12}>
              <TextField
                id="outlined-password-input"
                label="Name"
                type="text"
                value={state.name}
                autoComplete="current-password"
                variant="outlined"
                onChange={handleChange}
                inputProps={{
                  maxLength: 30,
                  name: "name",
                  id: "outlined-password-input",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-password-input"
                label="Email"
                type="email"
                floatingLabelText="email"
                value={state.email}
                variant="outlined"
                onChange={handleChange}
                inputProps={{
                  name: "email",
                  id: "outlined-password-input",
                }}
              />
            </Grid>
            <label className="text-danger">
              <strong>{error.email_error_text}</strong>
            </label>

            <Grid item xs={12}>
              <TextField
                id="outlined-password-input"
                label="Contact"
                type="tel"
                value={state.contact}
                autoComplete="current-password"
                variant="outlined"
                className={classes.textF}
                onChange={handleChange}
                inputProps={{
                  name: "contact",
                  id: "outlined-password-input",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-password-input"
                type="date"
                value={state.dob}
                autoComplete="current-password"
                variant="outlined"
                className="role-select"
                onChange={handleChange}
                inputProps={{
                  name: "dob",
                  id: "outlined-password-input",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl className="role-select">
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.role}
                  onChange={handleChange}
                  inputProps={{
                    name: "role",
                    id: "outlined-password-input",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"owner"}>Owner</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"operator"}>Operator</MenuItem>
                  <MenuItem value={"user"}>User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <label className="text-danger">
              <strong>{error.role_error_text}</strong>
            </label>
            <Grid item xs={12}>
              <div className={classes.button}>
                <Button
                  onClick={onSubmit}
                  type="submit"
                  style={{ marginBottom: "10px" }}
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default Forms;
