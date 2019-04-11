const mongoose = require("mongoose");

const dbURI =
"mongodb+srv://mkallarakodi:muzz@demo-cqflh.mongodb.net/test?retryWrites=true";


const options = {
  useNewUrlParser: true,
  dbName: "Sample"
};

mongoose.connect(dbURI, options).then(
 () => {
   console.log("Database connection established!");
 },
 err => {
   console.log("Error connecting Database instance due to: ", err);
 }
);

