const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = 5000;
var cors = require("cors");

//entry point of our backend services
app.use(express.json());
app.use(cors());

//routing method used for modularity
app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
connectToMongo();
