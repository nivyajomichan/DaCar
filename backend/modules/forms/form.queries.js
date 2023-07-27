exports.getMasterData = function () {
  return db
    .from("car_details")
    .select(["brand", "model"])
    .where("is_training", true);
};

exports.getBrands = function () {
  return db.raw(
    "select distinct brand from car_details cd where is_training =true order by brand;"
  );
};

exports.getModels = function () {
  return db.raw(
    "select distinct brand,model from car_details cd  where is_training =true order by model;"
  );
};

exports.newCar = function (car_obj) {
  return db.from("car_details").insert(car_obj).returning("car_id");
};

exports.newLog = function (log_obj) {
  return db.from("user_logs").insert(log_obj);
};
