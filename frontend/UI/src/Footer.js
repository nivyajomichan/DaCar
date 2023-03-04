import React from "react";
import { Typography } from "@material-ui/core";

const Footer = () => (
  <>
    <footer
      style={{
        padding: "10px 0",
        position: "absolute",
        left: "0",
        bottom: "0",
        right: "0",
      }}
    >
      <Typography varirant="h6" align="center" gutterBottom>
        Applied Database Technologies @ Dacar
      </Typography>
      <Typography
        varirant="subtitle1"
        align="center"
        color="textSecondary"
      ></Typography>
    </footer>
  </>
);
export default Footer;
