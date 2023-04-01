const express = require("express"),
  helmet = require("helmet"),
  cors = require("cors"),
  morgan = require("morgan"),
  controller = require("./api/controllers/"),
  dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(controller);
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: "http://127.0.0.1:5173" }));

app.listen(process.env.PORT, () =>
  console.log(`Started web server @ ${process.env.PORT}.`)
);
