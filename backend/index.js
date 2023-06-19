const express = require("express");
const app = express();

var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const contentDisposition = require("content-disposition");
const dotenv = require("dotenv");

dotenv.config({
  path: __dirname + "/.env",
});
const log = require("./api/v1/common/logs/logs.v2.services");

const redis = require("redis");
const session = require("express-session");
const connectRedis = require("connect-redis");

const RedisStore = connectRedis(session);

const REDIS = require("./api/v1/common/redis");

global.redisNew = new REDIS();
global.redisClient;
console.log(`REDIS -- ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
(async () => {
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
  // await redisClient.connect();
  redisClient.on("error", function (err) {
    console.log("Could not establish a connection with redis. " + err);
  });
  redisClient.on("connect", function (err) {
    console.log("Connected to redis successfully");
  });
})();

global.db = require("./knexfile");

const cors = require("cors");

global.HttpStatus = require("http-status-codes");
global.dirname = __dirname;
global.app_name = "DACAR-BACKEND";

const port = process.env.PORT || 3003;

const RouterV1 = require("./api/v1/v1.router");
const AuthRouter = require("./api/v1/routers/auth.router");

app.use("*", log.logRequest);

app.use(function (req, res, next) {
  res.bhejdo = function (status, body = {}) {
    log.logResponse(req, res, body, status);
    if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
      const msg = "<p>Oops! Something went wrong 😞</p>";
      if (body && body.stack) {
        return res.status(status).send({
          success: false,
          msg: msg,
          err: body.stack,
        });
      } else if (body) {
        return res.status(status).send(body);
      } else {
        return res.status(status).send({
          success: false,
          msg: msg,
        });
      }
    } else if (status == HttpStatus.REQUEST_TOO_LONG) {
      return res.status(status).send({
        success: false,
      });
    } else {
      //body.acf = res.acf;
      if (body && body.msg && req.method == "DELETE") {
        //body.msg += '';
      }
      return res.status(status).send(body);
    }
  };

  res.errorBhejdo = function (status, body = {}, acfBhejnaHai, custom_error) {
    log.warn(status + " Error received by errorBhejdo!");
    if (!custom_error) {
      if (body && body.stack) {
        log.logError(body.stack);
      } else if (body && body.msg) {
        log.logError(body.msg);
      } else {
        log.logError("ERROR");
      }
    } else {
      if (custom_error.message && custom_error.stack)
        log.logError(custom_error);
      else if (typeof custom_error == "string")
        log.logCustomError(custom_error);
      else if (typeof custom_error == "object")
        log.logCustomError(JSON.stringify(custom_error));
      else log.logError("Error");
    }

    return res.bhejdo(status, body, acfBhejnaHai);
  };

  res.bufferBhejdo = function (buffer, fileName) {
    // res.setHeader("Content-Disposition", contentDisposition(fileName));
    const status = HttpStatus.OK;
    log.logResponse(
      req,
      res,
      {
        bufferSize: buffer.length,
        fileName: fileName,
      },
      status
    );
    return res.status(status).send(buffer);
  };
  next();
});

let corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (process.env.WHITELIST.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: true,
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {
      origin: false,
    }; // disable CORS for this request
  }

  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use("*", (req, res, next) => {
  res.set({
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "X-DNS-Prefetch-Control": "off",
    maxAge: process.env.MAX_AGE,
    includeSubDomains: true,
    preload: true,
    preflightContinue: false,
    "Access-Control-Allow-Origin": process.env.WHITELIST,
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, sentry-trace, Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Credentials": true,
  });

  const result = /^(http(s)?(:\/\/))?((.*)\.)?leadschool\.in(\/.*)?$/.test(
    req.headers.referer
  );

  if (
    req.headers.source === "webapp" &&
    !result &&
    (process.env.SERVER_SETUP === "production" ||
      process.env.SERVER_SETUP === "staging")
  ) {
    const msg =
      "<h1>SECURITY ALERT!!</h1><p>Looks like you are using the erp from an unauthorized website. Please follow the steps below.</p><ol><li>Type erp.leadschool.in in your browser.</li><li>Immediately change your password.</li><li>Report this at excellence@leadschool.in immediately</li></ol><h1>SECURITY ALERT!!</h1>";
    log.warn({
      warning: msg,
      referer: req.headers.referer,
    });
    return res.errorBhejdo(HttpStatus.NOT_FOUND, {
      success: false,
      msg: msg,
    });
  } else {
    for (let q in req.query) {
      req.query[q] = decodeURIComponent(req.query[q]);
    }
    for (let q in req.params) {
      req.params[q] = decodeURIComponent(req.params[q]);
    }

    cors(corsOptionsDelegate)(req, res, next);
  }
});

app.use(cookieParser());

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: false,
  })
);

app.use(
  session({
    name: "session",
    secret: process.env.TOKEN_SECRET,
    // create new redis store.
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 259200000,
      sameSite: "strict",
    },
  })
);

app.listen(port, () => console.log(`Server is listening on port ${port}!`));

app.use("/dacar/auth", AuthRouter);
app.use("/dacar/v1", RouterV1);

module.exports = app;
