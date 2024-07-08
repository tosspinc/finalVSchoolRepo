    const express = require("express");
    const app = express();

    //middleware
    app.use(express.json());  //looks for a request body and turns it into 'req.body' and then fires on every request.

    app.use("/bountyhunter", require("./routes/bountyHunterRouter.js"))

    //basic handle error
    app.use((err, req, res, next) => {
        console.err(err.stack);
        res.status(500).send("Something Broke!");
    })

    //server listen
    app.listen(9000, () => {
        console.log("Server is running on port: 9000")
    })