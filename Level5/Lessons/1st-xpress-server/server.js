const express = require("express");
const app = express();   //app now has everything to become a server from express.


//Middleware (happens for every request)//
app.use(express.json());    //looks for a request body, turns it into 'req.body' and fires on every request.

app.use("/movies", require("./routes/movieRouter.js"))
app.use("/tvShows", require("./routes/tvShowRouter.js"))


// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
    
//server listen //
app.listen(9000, () => {
    console.log("Server is running on port: 9000")
})  