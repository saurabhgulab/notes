const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
connectToMongo();
