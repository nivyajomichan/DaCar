import React from "react";
import { Typography, Box, CssBaseline, Container } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "./Header";

const theme = createTheme();

const About = () => {
  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: 4,
            }}
          >
            <Typography variant="h3" align="center" color="textPrimary" gutterBottom sx={{ fontStyle: 'Bold', color: "#32093D", marginTop: 4, marginBottom: 4 }}>
              Contact the Developers
            </Typography>

            <Typography variant="h5" align="center" color="textPrimary" gutterBottom sx={{ fontStyle: 'Italic', color: "#32093D", marginTop: 2, marginBottom: 4 }}>
              Nivya Jomichan <br />
              niv@iu.edu <br />
              +1 (812) 803-5467
            </Typography>


            <Typography variant="h5" align="center" color="textPrimary" gutterBottom sx={{ fontStyle: 'Italic', color: "#32093D", marginTop: 2, marginBottom: 2 }}>
              Pramod Bhakta <br />
              pnbhakta@iu.edu <br />
              +1 (812) 391-6233
            </Typography>



          </Box>
        </Container >
      </ThemeProvider >
    </>
  );

}

export default About;