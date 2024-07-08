import express from "express";

const people = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 28 }
];

const sortByPropertyRouter = express.Router();

function sortByProperty(objects, propertyName) {
    const sortedArray = objects.slice();

    sortedArray.sort((a, b) => {
        if (a[propertyName] < b[propertyName]) {
            return -1;
        } else if (a[propertyName] > b[propertyName]) {
            return 1;
        } else {
            return 0;
        }
    });
    return sortedArray;
}

sortByPropertyRouter.get("/", (req, res) => {
    try {
        const sortedByAge = sortByProperty(people, "age");
        res.json(sortedByAge);
    } catch (error) {
        console.error("Error in /api/sorted route:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default sortByPropertyRouter;
