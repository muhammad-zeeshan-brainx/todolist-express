const express = require("express");

const app = new express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/tasks", require("./routes/taskRoutes"));

app.listen(port, () => console.log(`server started at port ${port}`));
