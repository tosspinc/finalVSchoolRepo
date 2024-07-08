const express = require("express");
const app = express();
const { v4 : uuidv4} = require("uuid")

//middleware
app.use(express.json())         //looks for a req body and turns it into a req.body and fires on each request.

app.use("/items", (req, res, next) => {
    console.log("The items middleware was executed")
    next();
})

app.use("/items", (req, res, next) => {
    req.body = { name: "Rick"}
    next()      //without this next postman req just times out as this is needed.
})

app.get("/items", (req, res, next) => {
    console.log("Get request received.")
    res.send(req.body)
})

//basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//server listen //
app.listen(9000, () => {
    console.log("Server is running on port: 9000")
})