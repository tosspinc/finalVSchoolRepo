    const express = require("express");
    const { v4 : uuidv4} = require("uuid");
    const morgan = require("morgan");
    const app = express();

    //middleware
    app.use(express.json());
    app.use(morgan("dev"));

    // app.use("/movies", require("./routes/movieRouter.js"))
    // app.use("/tvshows", require("./routes/tvshowRouter.js"))

    app.use("/api/movies", require("./routes/movieRouter.js"))
    app.use("/api", require("./routes/tvshowRouter.js"))


    //error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        return res.send({ errMsg: err.message })
    })

    //server listen
    app.listen(9000, () => {
        console.log("Server is running on port: 9000")
    })