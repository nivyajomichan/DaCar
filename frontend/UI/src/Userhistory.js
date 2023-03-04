import React, { Component } from "react";
import { Typography, Box, CssBaseline, Container } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import axios from "axios";
import Header from "./Header";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";

const theme = createTheme();

class Userhistory extends Component {
  constructor() {
    super();
    this.state = {
      userHistory: [],
      DataisLoaded: true,
    };
    this.FetchHistory = this.FetchHistory.bind(this);
  }

  componentDidMount() {
    this.FetchHistory();
  }

  async FetchHistory() {
    const axiosApiCall = (url, method, body = {}) =>
      axios({
        method,
        url: `${url}`,
        data: body,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    try {
      let res = await axiosApiCall(
        `${process.env.REACT_APP_API_GTW}/dacar/v1/userlogs`,
        "GET"
      );
      this.setState({ userHistory: res.data.data, DataisLoaded: true });
    } catch (err) {
      console.log("In Error");
    }
  }

  async DeleteHistory(id, requestData) {
    const axiosApiCall = (url, method, body = {}) =>
      axios({
        method,
        url: `${url}`,
        data: body,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });

    try {
      let res = await axiosApiCall(
        `${process.env.REACT_APP_API_GTW}/dacar/v1/editlogs/` + id,
        "PUT",
        requestData
      );
    } catch (err) {
      console.log("In Error");
    }
  }

  render() {
    const { DataisLoaded, userHistory } = this.state;

    const removeID = (id, logData) => {
      logData["is_deleted"] = true;
      this.DeleteHistory(id, logData);

      const newData = userHistory.filter(item => item.log_id !== id);
      this.setState({ userHistory: newData });

      alert("Log Entry Deleted Successfully");
    }

    function RenderRow(props) {
      const { index, style } = props;
      return (
        <ListItem id="listitem" style={style} key={index} component="div"
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => removeID(userHistory[index].log_id, userHistory[index])} >
              <DeleteIcon />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton id={userHistory[index].log_id} sx={{ boxShadow: 1 }}>
            <Link
              to="/mainform"
              state={{ state: userHistory[index] }}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemText id="listitemText" primary={userHistory[index].year + " bought " + userHistory[index].brand + " " + userHistory[index].model + " with " + userHistory[index].transmission + " transmission and  " + userHistory[index].fuel_type + " fuel type."} />
            </Link>
          </ListItemButton>
        </ListItem>
      );
    }

    if (DataisLoaded)
      return (
        <>
          <main>
            <Header />
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="md">
                <CssBaseline />
                <div style={{ display: "flex" }}>

                </div>
                <Box
                  sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: 4,
                  }}
                >
                  <Typography
                    sx={{ mt: 2 }}
                    variant="h4"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    Dacar User History
                  </Typography>

                  <Typography
                    sx={{ mt: 2, mb: 3 }}
                    variant="h6"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    Recent Searches
                  </Typography>
                  <Box sx={{ bgcolor: "background.paper", boxShadow: 4, marginBottom: 6 }}>
                    <FixedSizeList

                      height={400}
                      width={750}
                      itemSize={46}
                      itemCount={userHistory.length}
                      overscanCount={5}
                    >
                      {RenderRow}
                    </FixedSizeList>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </main>
        </>
      );
  }
}

export default Userhistory;
