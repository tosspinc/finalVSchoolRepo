import express from "express";
import morgan from "morgan";
import sortByPropertyRouter from "./routes/sortedByPropertyRouter.js"; // Ensure this path is correct

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Route handling
app.use("/api/sorted", sortByPropertyRouter);

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something Broke!");
});

// Server listening
app.listen(9000, () => {
    console.log("server is running on port: 9000");
});
