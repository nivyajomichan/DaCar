const _ = require("lodash");
const logQueries = require("./logs.queries");

exports.getLogs = getLogs;
exports.editLogs = editLogs;

async function getLogs(user) {
  try {
    let logs = await logQueries.getLogs(user.id);
    console.log(logs);
    return logs;
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

async function editLogs(body, log_id) {
  try {
    let car_data = create_car_data(body);
    let new_car = await logQueries.updateUserCars(car_data, body.car_id);
    let log_data = create_log_data(body);
    let new_log = await logQueries.updateUserLogs(log_data, log_id);
    return true;
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

function create_car_data(data) {
  let car_data = {
    model: data.model,
    brand: data.brand,
    year: data.year,
    transmission: data.transmission,
    mileage: data.mileage,
    fuel_type: data.fuel_type,
    tax: data.tax,
    mpg: data.mpg,
    engine_size: data.engine_size,
    price_quoted: data.price_quoted,
    is_training: false,
  };
  return car_data;
}

function create_log_data(data) {
  let log_obj = {
    user_id: data.user_id,
    car_id: data.car_id,
    is_sell: data.is_sell,
    is_deleted: data.is_deleted,
  };
  return log_obj;
}
