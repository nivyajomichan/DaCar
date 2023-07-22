const db_name = "epsilon";
const fs = require('fs');
const util = require('util');

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


// populateDatabase();


function readCSVandInsertInDb() {
  const readFileAsync = util.promisify(fs.readFile);

  const filePath = 'backend/DB/cars_file.csv';

  async function readCSVFile() {
    try {
      const csvData = await readFileAsync(filePath, 'utf8');
      const rows = csvData.split('\n').map(row => row.split(','));

      // If the CSV file has headers, you can access them as follows:
      const headers = rows[0];
      
      // If you want to skip the header row, you can start from index 1:
      // const rowsWithoutHeaders = rows.slice(1);


      parseRows(rows);

      // You can perform further operations with the 'rows' array here
    } catch (error) {
      console.error('Error occurred while reading the CSV file:', error.message);
    }
  }
  readCSVFile();
}
readCSVandInsertInDb();



async function parseRows(data) {
  
  // Extract the headers
  const headers = data[0];
  
  // Remove the header row from the data
  const rows = data.slice(1);
  
  // Initialize an array to store objects
  const arrayOfObjects = [];
  
  // Iterate through the rows
  for (const row of rows) {
    const obj = {};
    // Iterate through the headers and assign values from the current row to the corresponding keys
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i];
    }
    obj['is_training'] = true;
    obj['year'] = parseInt(obj['year']);
    obj['price'] = parseFloat(obj['price']);
    obj['mileage'] = parseFloat(obj['mileage']);
    obj['tax'] = parseFloat(obj['tax']);
    obj['mpg'] = parseFloat(obj['mpg']);
    obj['engine_size'] = parseFloat(obj['engine_size']);
    obj['price_quoted'] = parseFloat(obj['price_quoted']);
    
    delete obj[''];
    // Add the object to the array
    arrayOfObjects.push(obj);
  }
  
  console.log(arrayOfObjects);
  await chunkArray(arrayOfObjects, 100);
}


async function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  

  for (let chunk of chunks) {
    await knex('car_details').insert(chunk);
  }
  

}