const db_name = "epsilon";


let knex = require("knex")({
 client: "pg",
 connection: {
   host: "127.0.0.1",
   port: "5433",
   charset: "utf8",
 },
});


function updateConnection(db_name) {
 knex = require("knex")({
   client: "pg",
   connection: {
     host: "127.0.0.1",
     port: "5433",
     charset: "utf8",
     database: db_name,
   },
 });
}


function createDatabase(database_name) {
 knex.raw(`CREATE DATABASE ${database_name};`).then(function () {
   // return knex.raw("DROP DATABASE DACAR;");
   console.log("Created Database!");
   updateConnection(database_name);
 });
}


function createTables(queryString) {
 try {
   knex.raw(queryString).then(function () {
     console.log("Table Created");
   });
 } catch (err) {
   console.log(err);
 }
}

function populateDatabase(){
    try {
        knex.raw(queryString).then(function () {
          console.log("Table Created");
        });
      } catch (err) {
        console.log(err);
      }
}
// createDatabase(db_name);
updateConnection(db_name);


let create_users_string =
 "CREATE TABLE public.users ( \
   user_id serial4 NOT NULL,\
   email varchar(255) NOT NULL,\
   first_name varchar(255) NULL,\
   last_name varchar(255) NULL,\
   google_id varchar(255) NOT NULL,\
   image_url varchar(255) NULL,\
   created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,\
   CONSTRAINT users_email_unique UNIQUE (email),\
   CONSTRAINT users_google_id_unique UNIQUE (google_id),\
   CONSTRAINT users_pkey PRIMARY KEY (user_id)\
);";
// createTables(create_users_string);


let create_cars_table =
 "CREATE TABLE public.car_details ( \
   car_id serial4 NOT NULL, \
   model varchar(255) NOT NULL, \
   brand varchar(255) NOT NULL, \
   year int4 NOT NULL,\
   price NUMERIC NOT NULL,\
   transmission varchar(255) NOT NULL,\
   mileage NUMERIC NOT NULL,\
   fuel_type varchar(255) NOT NULL,\
   tax NUMERIC NOT NULL,\
   mpg NUMERIC NOT NULL,\
   engine_size NUMERIC NOT NULL,\
   price_quoted NUMERIC NOT NULL,\
   is_training BOOLEAN NOT NULL, \
   CONSTRAINT car_pkey PRIMARY KEY (car_id)); \
";


// createTables(create_cars_table);


let create_user_logs_string =
 "CREATE TABLE public.user_logs (\
   log_id serial4 NOT NULL, \
   user_id int4 NOT NULL, \
   car_id int4 NOT NULL, \
   search_timestamp timestamptz NULL DEFAULT CURRENT_TIMESTAMP, \
   is_sell BOOLEAN NOT NULL, \
   is_deleted BOOLEAN NOT NULL, \
   CONSTRAINT log_pkey PRIMARY KEY (log_id),\
   CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id),\
   CONSTRAINT fk_car FOREIGN KEY(car_id) REFERENCES car_details(car_id)); ";


// createTables(create_user_logs_string);


populateDatabase();