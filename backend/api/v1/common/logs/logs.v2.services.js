
const path = require('path');
const os = require('os');
const uid = require('uid')
const log_master_enabled = ([undefined, null].includes(process.env.LOG_MASTER)) ? true : !!+process.env.LOG_MASTER;

let logger = {};

let log_metadata = {
    environment: process.env.SERVER_SETUP,
    app: global.app_name,
    pid: process.pid,
    hostname: os.hostname
};

process.on('uncaughtException', function (error) {
    if (log_master_enabled) {
        try {
            console.log(JSON.stringify(
                {
                    "meta": {
                        "tag": "Uncaught Exception",
                        "request": {
                            "method": "",
                            "url": ""
                        }
                    },
                    "log": {
                        "err": error,
                        "moment": new Date()
                    }
                }
            ));
        } catch (err) {
            console.error("LOG ERROR at " + new Date() + " : " + err.stack)
        }
    }
});

process.on('unhandledRejection', function (error, src) {
    if (log_master_enabled) {
        try {

            console.log(JSON.stringify(
                {
                    "meta": {
                        "tag": "unhandled Rejection",
                        "request": {
                            "method": "",
                            "url": ""
                        }
                    },
                    "log": {
                        "err": error,
                        "moment": new Date()
                    }
                }
            ));


        } catch (err) {
            console.error("LOG ERROR at " + new Date() + " : " + err.stack)
        }
    }
});

process.on('warning', function (error) {
    if (log_master_enabled) {
        try {

            console.log(JSON.stringify(
                {
                    "meta": {
                        "tag": "Warning",
                        "request": {
                            "method": "",
                            "url": ""
                        },
                        "ignore": true
                    },
                    "log": {
                        "err": error,
                        "moment": new Date()
                    }
                }
            ));


        } catch (err) {
            console.error("LOG ERROR at " + new Date() + " : " + err.stack)
        }
    }
});

logger.logRequest = async function (req, res, next) {
    if (log_master_enabled) {
        try {
            req.request_id = uid.uid(12) + Date.now();
            var objLog = {
                request_id: req.request_id,
                body: req.body || null,
                headers: req.headers || null,
                method: req.method || null,
                path: req.originalUrl || null,
                query: req.query || null,
                user: req.user || null,
                log_metadata: log_metadata
            };


            console.log(JSON.stringify(
                {
                    "meta": {
                        "tag": "Request Log",
                        "request": {
                            "method": "",
                            "url": ""
                        },
                        "ignore": true
                    },
                    "log": {
                        response: objLog,
                        type: "Request"
                    }
                }
            ));



        } catch (err) {
            console.error("LOG ERROR at " + new Date() + " : " + err.stack)
        }
    }
    next();
    return;
};

logger.logResponse = async function (req, res, body, status) {
    if (log_master_enabled) {
        try {
            var objLog = {
                code: status || null,
                headers: res._headers || null,
                body: body,
                req: {
                    request_id: req.request_id,
                    body: req.body || null,
                    headers: req.headers || null,
                    method: req.method || null,
                    path: req.originalUrl || null,
                    query: req.query || null,
                    user: req.user || null
                },
                log_metadata: log_metadata
            };
            objLog.log_metadata.user_id = req.user ? req.user.id : null;
            objLog.log_metadata.user_mobile = req.user ? req.user.mobile : null;


            console.log(JSON.stringify(
                {
                    "meta": {
                        "tag": "Response Log",
                        "request": {
                            "method": "",
                            "url": ""
                        },
                        "ignore": true
                    },
                    "log": {
                        response: objLog,
                        type: "Response"
                    }
                }
            ));



        } catch (err) {
            console.error("LOG ERROR at " + new Date() + " : " + err.stack)
        }
    }
};

logger.logError = function (error, unique_id) {
    if (log_master_enabled) {
        try {
            console.log(JSON.stringify(
                {
                    "meta": {
                        "tag": "Error Log",
                        "request": {
                            "method": "",
                            "url": ""
                        }
                    },
                    "log": {
                        "err": error,
                        "type": "Error",
                        "moment": new Date()
                    }
                }
            ));

        } catch (err) {
            console.error("LOG ERROR at " + new Date() + " : " + err.stack);
        }
    }
};

logger.warn = async function (err) {
    if (log_master_enabled) {
        try {

            console.log(JSON.stringify(
                {
                    "meta": {
                        "tag": "Warn Log",
                        "request": {
                            "method": "",
                            "url": ""
                        }
                    },
                    "log": {
                        "err": err,
                        type: "Error",
                        "moment": new Date()
                    }
                }
            ));

        } catch (err) {
            console.error("LOG ERROR at " + new Date() + " : " + err.stack);
        }
    }
}

logger.logInfo = async function (msg) {
    if (log_master_enabled) {
        try {

            console.log(JSON.stringify(
                {
                    "meta": {
                        "tag": "General Log",
                        "request": {
                            "method": "",
                            "url": ""
                        }
                    },
                    "log": {
                        "msg": msg,
                        type: "Info",
                        "moment": new Date()
                    }
                }
            ));
        }

        catch (err) {
            console.error("LOG ERROR at " + new Date() + " : " + err.stack);
        }
    }
}

logger.debug = async function (msg) {
    if (log_master_enabled) {
        try {

            console.log(JSON.stringify(
                {
                    "meta": {
                        "tag": "Debug Log",
                        "request": {
                            "method": "",
                            "url": ""
                        },
                        "ignore": true
                    },
                    "log": {
                        "msg": msg,
                        type: "Info",
                        "moment": new Date()
                    }
                }
            ));

        }
        catch (err) {
            console.error("LOG ERROR at " + new Date() + " : " + err.stack);
        }
    }
}

module.exports = logger;