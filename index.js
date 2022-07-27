const express = require("express");

const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/newdb");
}

console.log("hey");
main()
  .then(() => {
    console.log("db connected");
    const app = new express();

    const port = process.env.PORT || 3000;

    app.use(express.json());

    app.use("/tasks", require("./routes/taskRoutes"));

    app.listen(port, () => console.log(`server started at port ${port}`));
  })
  .catch((err) => console.log(err));

module.exports = mongoose;
