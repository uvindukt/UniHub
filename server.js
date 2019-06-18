const express = require("express");
const mongoose = require("mongoose");

const app = express();

/**
 * Database Options.
 */
const dbOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
};

/**
 * Database connection.
 */
const db = require("./config/keys").mongoURI;
mongoose
    .connect(db, dbOpts)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/student", require("./routes/api/router.student"));
app.use("/api/admin", require("./routes/api/router.admin"));
app.use("api/course", require("./routes/api/router.course"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => err ? console.log(err) : console.log(`Sever is listening to port ${PORT}`));
