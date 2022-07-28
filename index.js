const express = require("express");
const db = require("./db.js");

const app = new express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/tasks", require("./routes/taskRoutes"));

db.connection()
  .then((res) => {
    app.listen(port, () => console.log(`server started at port ${port}`));
  })
  .catch((error) => {
    console.log(error);
  });
