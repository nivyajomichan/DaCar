import React from "react";
import { Typography, CssBaseline } from '@material-ui/core';
import Header from "./Header";


const NotFound = () => {
    return (
        <main>
            <CssBaseline />
            <Header />
            <Typography variant="h5" align="center" color="textPrimary" gutterBottom sx={{ fontStyle: 'Italic', color: "#32093D", marginTop: 35, marginBottom: 2 }}>
                The page you are looking for doesn't exist.
            </Typography>
        </main>
    );
}

export default NotFound;