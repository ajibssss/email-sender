const express = require("express");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");


const PORT = process.env.PORT || 3000;
dotenv.config();

const app = express();
const router = express.Router();
const blogsRoutes = require("./routes/blog");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", blogsRoutes);


//connect to mongodb
/*
mongoose
  .connect( process.env.CONNECTION_STRING)
  .then(() => {
    console.log(`Listening on ${ PORT }`);
  })
  .catch(err => console.log(err));


mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,

    autoIndex: true //make this also true
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(err => {
    console.error("App starting error:", err.stack);
    process.exit(1);
  });
*/
//const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.get("/h", (req, res) => {
  res.send("Successful response.");
});
app.use("/", router);
// get data for charge by id

//app.listen(port, function() {
//console.log(`api running on port ${port}`);
//});