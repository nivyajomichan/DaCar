import React from "react";
import { AppBar, CssBaseline, Toolbar, Box } from "@material-ui/core";
import Button from "@mui/material/Button";
import axios from "axios";
import Link from "@mui/material/Link";
import { Link as Link2 } from "react-router-dom";

export const axiosApiCall = (url, method, body = {}) =>
  axios({
    method,
    url: `${url}`,
    data: body,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

const LogUserOut = () => {
  axiosApiCall(`${process.env.REACT_APP_API_GTW}/dacar/auth/logout`, "POST")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const Header = () => (
  <>
    <CssBaseline />
    <AppBar position="relative" style={{ background: "black" }}>
      <Toolbar>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="/Mainform"
            sx={{ my: 1, mx: 1.5, textDecoration: "none", color: "white" }}
          >
            Predict
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/About"
            sx={{ my: 1, mx: 1.5, textDecoration: "none", color: "white" }}
          >
            About
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/Contact"
            sx={{ my: 1, mx: 1.5, textDecoration: "none", color: "white" }}
          >
            Contact
          </Link>

          <Link
            variant="button"
            color="text.primary"
            href="/history"
            sx={{ my: 1, mx: 1.5, textDecoration: "none", color: "white" }}
          >
            History
          </Link>
        </nav>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          style={{ marginLeft: "950px" }}
        >
          <Link2 to="/" style={{ textDecoration: "none" }}>
            <Button
              style={{ marginTop: "10px", background: "#0066CC" }}
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={() => LogUserOut()}
            >
              Logout
            </Button>
          </Link2>
        </Box>
      </Toolbar>
    </AppBar>
  </>
);
export default Header;
