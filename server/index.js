const express = require("express");
var path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));

var URLstring =
  "mongodb+srv://devit:KuZ74TZWx5owXlru@cluster0.djpfo.mongodb.net/image-gallery?retryWrites=true&w=majority";

app.use("/galleries", require("./routes/gallery"));

mongoose.connect(URLstring, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("./uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
module.exports = app.listen(PORT, () => {
  console.log("Server listening in port:" + PORT);
});
