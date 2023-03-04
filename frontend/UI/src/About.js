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
                <Container component="main" maxWidth="100%" >
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
                        <Typography variant="h5" align="center" color="textPrimary" gutterBottom sx={{ fontStyle: 'italic', color: "#32093D", marginTop: 4, marginBottom: 4 }}>
                            Purchase and sale of used cars is increasing day by day due to various reasons like the
                            owner of the car wants to purchase a new model with latest features, high power engine, more
                            luxury, etc. and even the buyers have increased due to people not having enough budget to get
                            a brand-new car, people new to driving, students, etc. are more interested in getting a used car
                            at best price. Both buyers and sellers of used cars are not sure about how much they should sell
                            their car for or how much they should buy it for. To solve this problem, we have built a prediction
                            model using Linear Regression based on the data of 100000 used cars from various
                            brands which will give us a price range in which one should buy or sell their car. The prediction
                            model uses various features like model, brand, year of purchase, transmission, etc. to give us this
                            price range.
                        </Typography>
                    </Box>
                </Container >
            </ThemeProvider >
        </>
    );

}

export default About;