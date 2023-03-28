const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Parameters
      // 1st: parameter means the error
      // 2nd: is saying that origin will sent back
      callback(null, true);
    } else {
      callback(new Error("Not allowed byCORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
