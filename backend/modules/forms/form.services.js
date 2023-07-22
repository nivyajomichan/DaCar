const _ = require("lodash");
const formQueries = require("./form.queries");
const axios = require("axios");

exports.getMasterData = getMasterData;
exports.putNewCarData = putNewCarData;

async function getMasterData() {
  try {
    let brands = await formQueries.getBrands();
    let models = await formQueries.getModels();

    let data = formatMasterData(brands.rows, models.rows);
    return data;
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

function formatMasterData(brands, models) {
  let final_data = {};
  final_data["fuel_type"] = [
    { key: 0, value: "Diesel" },
    { key: 1, value: "Electric" },
    { key: 2, value: "Hybrid" },
    { key: 3, value: "Other" },
    { key: 4, value: "Petrol" },
  ];
  final_data["transmission"] = [
    { key: 0, value: "Automatic" },
    { key: 1, value: "Manual" },
    { key: 2, value: "Other" },
    { key: 3, value: "Semi-Auto" },
  ];

  final_data["brands"] = [];
  let index = 0;
  for (let car of brands) {
    let obj = { key: index, value: car.brand };
    final_data["brands"].push(obj);
    index++;
  }

  final_data["models"] = {};
  for (let car of brands) {
    final_data["models"][car.brand] = [];
  }
  index = 0;
  for (let car of models) {
    let obj = { key: index, value: car.model.trim() };
    final_data["models"][car.brand].push(obj);
    index++;
  }
  return final_data;
}

async function putNewCarData(body, user) {
  try {
    let new_price = await pythonPrice(body);

    let car_data = create_car_data(body, new_price.message);
    let new_car = await formQueries.newCar(car_data);
    let log_data = create_log_data(body, user.id, new_car[0].car_id, new_price.message);
    let new_log = await formQueries.newLog(log_data);
    return new_price.message;
  } catch (err) {
    console.log(err);
    return { sucess: false };
  }
}

function create_car_data(data, price) {
  let car_data = {
    model: data.model,
    brand: data.brand,
    year: parseInt(data.year),
    transmission: data.transmission,
    mileage: parseFloat(data.mileage),
    fuel_type: data.fuel_type,
    tax: parseFloat(data.tax),
    mpg: parseFloat(data.mpg),
    engine_size: parseFloat(data.engine_size),
    price_quoted: parseFloat(price),
    is_training: false,
  };
  return car_data;
}

function create_log_data(data, user_id, car_id, price) {
  let log_obj = {
    user_id: user_id,
    car_id: car_id,
    is_deleted: false,
    price_details: price
  };
  return log_obj;
}

async function pythonPrice(body) {
  try {
    let req_body = {
      brand: body.brand_id,
      model: body.model_id,
      purchase_year: body.year,
      transmission_type: body.transmission_id,
      miles_driven: body.mileage,
      fuel_type: body.fuel_type_id,
      road_tax: body.tax,
      avg_miles_per_gallon: body.mpg,
      engine_size: body.engine_size,
    };
    let response = await axios.post(
      "http://127.0.0.1:8000/python/api/predict/",
      req_body
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      success: true,
      message: "Price range of car should be between $ 4000 and $ 7500",
    };
  }
}
