var mongoose = require("mongoose");
const dotenv = require('dotenv');
const db = require("../models");
const Role = db.role;
dotenv.config();

module.exports = () => {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true
    });

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
        initial();
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;


    function initial() {
        Role.estimatedDocumentCount((err, count) => {
          if (!err && count === 0) {
            new Role({
              name: "user"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
      
              console.log("added 'user' to roles collection");
            });
      
            new Role({
              name: "moderator"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
      
              console.log("added 'moderator' to roles collection");
            });
      
            new Role({
              name: "admin"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
      
              console.log("added 'admin' to roles collection");
            });
          }
        });
    }
}