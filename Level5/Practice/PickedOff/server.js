const express = require("express");     //imports the express library.
const app = express();   //initializes the express application now has everything to become a server from express.


//Middleware (happens for every request)//
app.use(express.json());    //parses JSON requests and makes them available under req.body property.

//uses the pickedOff route and when a message is received it logs the message and then call next()
app.use("/pickedOff", (req, res, next) => {
    console.log("I picked a green apple from the apple tree!")
    next()
})

//this assigns fruitType to the req.body and then calls next().
app.use("/pickedOff", (req, res, next) => {
    req.body = { fruitType: "Green Apple - It's super sour!"}
    next()
})

//handles the .get request and sends the content assigned to req.body
app.get("/pickedOff", (req, res, next) => {
    console.log("My Get request was received!")
    res.send(req.body)
})

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
    
//server listen - if everything is good then it displays message server is running on port 9000 in the terminal. //
app.listen(9000, () => {
    console.log("Server is running on port: 9000")
})  