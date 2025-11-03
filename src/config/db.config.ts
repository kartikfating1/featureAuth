// import mongoose from "mongoose";
// import MongoStore from "connect-mongo";
// import { appConstants } from "../constants/appConstants";
// import customLogger from "../config/logger";
// import { messageConstants } from "../constants/messageConstants";

// const logger = customLogger();
// let dbConnection: mongoose.Connection;

// type ConnectCallback = (error: Error | null) => void;

// export const db = {
//   connectToDb: (cb: ConnectCallback) => {
//     mongoose
//       .connect(appConstants.MONGO_DB, {
//         user: process.env.DB_USER_DEV,
//         pass: process.env.DB_PASSWORD_DEV,
//       })
//       .then(() => {
//         dbConnection = mongoose.connection;
//         return cb(null);
//       })
//       .catch((err) => {
//         return cb(err);
//       });
//   },

//   getDB: () => dbConnection,

//   getMongoSessionStore: () => {
//     return MongoStore.create({
//       mongoUrl: appConstants.MONGO_DB,
//       collectionName: "sessions",
//       ttl: 14 * 24 * 60 * 60, // 14 days
//     });
//   },
// };

// mongoose.connection.on("connected", () => {
//   logger.info(messageConstants.DB.CONNECT);
// });

// mongoose.connection.on("error", (err) => {
//   logger.error(messageConstants.DB.CONNECT_ERR + err);
// });

// mongoose.connection.on("disconnected", () => {
//   logger.info(messageConstants.DB.DISCONNECT);
// });
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import customLogger from "../config/logger";
import { messageConstants } from "../constants/messageConstants";

const logger = customLogger();
let dbConnection: mongoose.Connection;

type ConnectCallback = (error: Error | null) => void;

// Hardcoded MongoDB connection string (DEV only)
const DEV_MONGO_URL =
  "mongodb+srv://kartikfating:<Ksfunique@2611>@kartikfat.global.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000";

export const db = {
  connectToDb: (cb: ConnectCallback) => {
    mongoose
      .connect(DEV_MONGO_URL, {
        // Remove user/pass — credentials are part of URL
      })
      .then(() => {
        dbConnection = mongoose.connection;
        logger.info(messageConstants.DB.CONNECT);
        return cb(null);
      })
      .catch((err) => {
        logger.error(messageConstants.DB.CONNECT_ERR + err);
        return cb(err);
      });
  },

  getDB: () => dbConnection,

  getMongoSessionStore: () => {
    return MongoStore.create({
      mongoUrl: DEV_MONGO_URL,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, // 14 days
    });
  },
};

// Connection event listeners
mongoose.connection.on("connected", () => {
  logger.info(messageConstants.DB.CONNECT);
});

mongoose.connection.on("error", (err) => {
  logger.error(messageConstants.DB.CONNECT_ERR + err);
});

mongoose.connection.on("disconnected", () => {
  logger.info(messageConstants.DB.DISCONNECT);
});
