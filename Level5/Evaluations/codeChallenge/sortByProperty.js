//create a variable named people and set up array with name and age data.
const people = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35},
    { name: "David", age: 28 }
]

function sortByProperty(objects, PropertyName) {
    return objects.slice().sort((a, b) => b[PropertyName] - a[PropertyName])
}

const sortByAge = sortByProperty(people, "age")

console.log(sortByAge)



