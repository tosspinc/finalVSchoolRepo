const express = require("express");
const app = express();

app.use(express.json());

app.use("/thingFinder", require("./routes/thingFinderRouter.js"))

//error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something Broke!")
})

//server listen
app.listen(8000, () => {
    console.log("Server is running on port: 8000")
})