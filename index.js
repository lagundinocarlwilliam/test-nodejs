const express = require("express");
const app = express();
const cors = require('cors');


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/employee",require("./routes/employeeRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

app.listen(3000, () => {
    console.log("Server running");
});