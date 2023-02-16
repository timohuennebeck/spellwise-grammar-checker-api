const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT ?? 8080;

app.get("/", (_req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Express listening on ${PORT}`);
});
