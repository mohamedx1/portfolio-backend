const Mongoose = require("mongoose");

const connectDb = async () => {
  Mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("data Base connected");
    })
    .catch((error) => {
      console.log("error in conect data base : ", error);
    });
};

module.exports = connectDb;
