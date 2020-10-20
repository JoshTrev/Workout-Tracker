const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbExample", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}!`);
});