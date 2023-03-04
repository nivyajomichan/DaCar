exports.getLogs = function (user_id) {
  return db
    .from("user_logs as ul")
    .innerJoin("user_cars as uc", "uc.car_id", "ul.car_id")
    .select("*")
    .where("ul.user_id", user_id)
    .where("ul.is_deleted", false);
};

exports.updateUserCars = function (car_obj, car_id) {
  return db.from("user_cars").where("car_id", car_id).update(car_obj);
};

exports.updateUserLogs = function (log_obj, log_id) {
  return db.from("user_logs").where("log_id", log_id).update(log_obj);
};
