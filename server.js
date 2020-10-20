const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbExample", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}!`);
});