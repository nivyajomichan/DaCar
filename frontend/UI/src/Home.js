import React from "react";
import {
    Typography,
    Container,
    AppBar,
    CssBaseline,
    Toolbar,
} from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import Link from "@mui/material/Link";

const theme = createTheme();

const axiosApiCall = (url, method, body = {}) =>
    axios({
        method,
        url: `${url}`,
        data: body,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });

const Home = () => {
    const navigate = useNavigate();

    const ResponseGoogle = (response) => {
        axiosApiCall(
            `${process.env.REACT_APP_API_GTW}/dacar/auth/googleSignUp/`,
            "POST",
            response
        )
            .then((res) => {
                console.log(res);
                makeNav();
            })
            .catch((err) => {
                throw new Error(err);
            });
    };

    function makeNav() {
        //navigate("../maphome", { replace: true });
        navigate("../Mainform", { replace: true });
    }

    return (
        <>
            <main>
                <div>
                    <ThemeProvider theme={theme}>
                        <AppBar position="relative" style={{ background: "black" }}>
                            <Toolbar>
                                <nav>
                                    <Link
                                        variant="button"
                                        color="text.primary"
                                        href="/About"
                                        sx={{
                                            my: 1,
                                            mx: 1.5,
                                            textDecoration: "none",
                                            color: "white",
                                        }}
                                    >
                                        About
                                    </Link>
                                    <Link
                                        variant="button"
                                        color="text.primary"
                                        href="/Contact"
                                        sx={{
                                            my: 1,
                                            mx: 1.5,
                                            textDecoration: "none",
                                            color: "white",
                                        }}
                                    >
                                        Contact
                                    </Link>
                                </nav>
                            </Toolbar>
                        </AppBar>

                        <Container
                            component="main"
                            maxWidth="100%"

                        >
                            <CssBaseline />
                            <Typography
                                variant="h3"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                                sx={{ fontStyle: "bold", color: "#32093D", marginTop: 4 }}
                            >
                                WELCOME TO DACAR
                            </Typography>
                            <Typography
                                variant="h5"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                                sx={{ fontStyle: "bold", color: "#4F3535" }}
                            >
                                PREDICT THE VALUE OF YOUR CAR IN A FEW SIMPLE STEPS
                            </Typography>
                        </Container>

                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    boxShadow: 4,
                                }}
                            >
                                <Avatar sx={{ m: 3 }} style={{ background: "#0066CC" }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    color="textPrimary"
                                    gutterBottom
                                >
                                    Sign In
                                </Typography>

                                <Typography
                                    variant="h6"
                                    align="center"
                                    color="textSecondary"
                                    paragraph
                                >
                                    Please sign in with your Google Account
                                </Typography>
                                <Box
                                    component="form"
                                    noValidate
                                    sx={{ mt: 1, mb: 3, boxShadow: 4 }}
                                >
                                    <GoogleLogin
                                        clientId="636817888058-df41du2pgci4432ipd7b7afea6plq846.apps.googleusercontent.com"
                                        buttonText="Login with Google"
                                        onSuccess={ResponseGoogle}
                                        cookiePolicy="single_host_origin"
                                    />
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </main>
        </>
    );
};

export default Home;
