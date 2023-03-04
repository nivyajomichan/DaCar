import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { Typography } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";

const theme = createTheme();

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

const Mainform = () => {
    let data;
    const LoadDataFromHistory = async () => {
        const dataHistory = useLocation();
        if (dataHistory.state) {
            data = dataHistory.state.state || dataHistory.state;
        }
    };

    LoadDataFromHistory();

    const [dataFromAPI, setData] = useState();

    const FetchDataForForm = async () => {
        let res = await axiosApiCall(
            `${process.env.REACT_APP_API_GTW}/dacar/v1/dataforforms`,
            "GET"
        );
        setData(res["data"]["data"]);
    };

    const PredictCarPrice = async () => {
        const requestBody = {
            brand: document.getElementById("car-brand-select-sim").innerHTML,
            brand_id: dataFromAPI.brands.find(o => o.value === document.getElementById("car-brand-select-sim").innerHTML).key,
            model: document.getElementById("car-model-select-sim").innerHTML,
            model_id: dataFromAPI.models[document.getElementById("car-brand-select-sim").innerHTML].find(o => o.value === document.getElementById("car-model-select-sim").innerHTML).key,
            year: document.getElementById("year-purchased").value,
            transmission: document.getElementById("car-transmission-select-sim").innerHTML,
            transmission_id: dataFromAPI.transmission.find(o => o.value === document.getElementById("car-transmission-select-sim").innerHTML).key,
            mileage: document.getElementById("miles-driven").value,
            fuel_type: document.getElementById("fuel-type-select-sim").innerHTML,
            fuel_type_id: dataFromAPI.fuel_type.find(o => o.value === document.getElementById("fuel-type-select-sim").innerHTML).key,
            tax: document.getElementById("road-tax").value,
            mpg: document.getElementById("miles-gallon").value,
            engine_size: document.getElementById("engine-size").value,
        };

        console.log(requestBody);
        let res = await axiosApiCall(
            `${process.env.REACT_APP_API_GTW}/dacar/v1/carinfo`,
            "POST",
            requestBody
        );

        ReactDOM.render(
            res["data"]["msg"],
            document.getElementById("apiResponse")
        );
    };

    let selectBrand = "Bmw";
    const selectedBrand = (event) => {
        selectBrand = event.target.value;
        ReactDOM.render(
            <FormControl fullWidth>
                <InputLabel id="car-model-select">Car Model</InputLabel>
                <Select labelId="car-model-select" id="car-model-select-sim" defaultValue={data ? data["model"] : ""}>
                    {dataFromAPI.models[selectBrand].map((option) => {
                        return (
                            <MenuItem key={option.key} value={option.value}>
                                {option.value}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            ,
            document.getElementById("car-model-select-box")
        );
    };

    if (!dataFromAPI) {
        FetchDataForForm();
        return <>Still loading...</>;
    }
    return (
        <main>
            <Header />
            <Typography
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom
                sx={{ fontStyle: "bold", color: "#32093D", marginTop: 4 }}
            >
                WELCOME TO DACAR
            </Typography>

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            boxShadow: 4,
                        }}
                    >
                        <Box sx={{ minWidth: 400, marginTop: 4, marginBottom: 1 }}>
                            <FormControl fullWidth>
                                <InputLabel id="car-brand-select">Car Brand</InputLabel>
                                <Select
                                    labelId="car-brand-select"
                                    id="car-brand-select-sim"
                                    onChange={selectedBrand}
                                    defaultValue={data ? data["brand"] : ""}
                                >
                                    {dataFromAPI.brands.map((option) => {
                                        return (
                                            <MenuItem key={option.key} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box id="car-model-select-box" sx={{ minWidth: 400, marginTop: 2, marginBottom: 1 }}>
                            <FormControl fullWidth>
                                <InputLabel id="car-model-select">Car Model</InputLabel>
                                <Select
                                    labelId="car-model-select"
                                    id="car-model-select-sim"
                                    defaultValue={data ? data["model"] : ""}
                                >
                                    {dataFromAPI.models[data ? data["brand"] : "Audi"].map((option) => {
                                        return (
                                            <MenuItem key={option.key} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        );
                                    })}

                                </Select>
                            </FormControl>
                        </Box>

                        <TextField
                            id="year-purchased"
                            label="Year of Purchase"
                            variant="outlined"
                            type="number"
                            defaultValue={data ? data["year"] : ""}
                            sx={{ minWidth: 400, marginTop: 2, marginBottom: 1 }}
                        />

                        <Box sx={{ minWidth: 400, marginTop: 2, marginBottom: 1 }}>
                            <FormControl fullWidth>
                                <InputLabel id="car-transmission-select">
                                    Transmission Type
                                </InputLabel>
                                <Select
                                    labelId="car-transmission-select"
                                    id="car-transmission-select-sim"
                                    label="Transmission"
                                    defaultValue={data ? data["transmission"] : ""}
                                >
                                    {dataFromAPI.transmission.map((option) => {
                                        return (
                                            <MenuItem key={option.key} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>

                        <TextField
                            id="miles-driven"
                            label="Total no of Miles Driven"
                            variant="outlined"
                            type="number"
                            sx={{ minWidth: 400, marginTop: 2, marginBottom: 1 }}
                            defaultValue={data ? data["mileage"] : ""}
                        />

                        <TextField
                            id="miles-gallon"
                            label="Miles per Gallon"
                            variant="outlined"
                            type="number"
                            sx={{ minWidth: 400, marginTop: 2, marginBottom: 1 }}
                            defaultValue={data ? data["mpg"] : ""}
                        />

                        <Box sx={{ minWidth: 400, marginTop: 2, marginBottom: 1 }}>
                            <FormControl fullWidth>
                                <InputLabel id="fuel-type-select">Fuel Type</InputLabel>
                                <Select
                                    labelId="fuel-type-select"
                                    id="fuel-type-select-sim"
                                    label="Fuel Type"
                                    defaultValue={data ? data["fuel_type"] : ""}
                                >
                                    {dataFromAPI.fuel_type.map((option) => {
                                        return (
                                            <MenuItem key={option.key} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>

                        <TextField
                            id="engine-size"
                            label="Engine Size "
                            variant="outlined"
                            type="number"
                            sx={{ minWidth: 400, marginTop: 2, marginBottom: 1 }}
                            defaultValue={data ? data["engine_size"] : ""}
                        />

                        <TextField
                            id="road-tax"
                            label="Road Tax Paid"
                            variant="outlined"
                            type="number"
                            sx={{ minWidth: 400, marginTop: 2, marginBottom: 4 }}
                            defaultValue={data ? data["tax"] : ""}
                        />

                        <Button
                            style={{ marginTop: "10px", background: "#0066CC" }}
                            variant="contained"
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => PredictCarPrice()}
                        >
                            Predict
                        </Button>

                        <Typography
                            variant="h5"
                            id="apiResponse"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            sx={{
                                fontStyle: "bold",
                                color: "#32093D",
                                marginTop: 4,
                                marginBottom: 4,
                            }}
                        >{data ? data["price_quoted"] : ""}</Typography>
                    </Box>
                </Container>
            </ThemeProvider>
            <br></br>
            <div
                id="test"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            ></div>
        </main>
    );
};

export default Mainform;
