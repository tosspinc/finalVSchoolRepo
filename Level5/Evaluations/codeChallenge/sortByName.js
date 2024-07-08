//create a variable named people and set up array with name and age data.
const people = [
    { name: "Alice", age: 30 },
    { name: "Tyler", age: 65},
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35},
    { name: "David", age: 28 }
]

function sortByProperty(objects, PropertyName) {
    //return names in ascending order.
    //return objects.slice().sort((a, b) => b.PropertyName - a.PropertyName)
    
    //this works as it is number based, due to sorting an array.
    //returns name is a descending order.  does not work.
    //return objects.slice().sort((a, b) => b[PropertyName] - a[PropertyName])
    
    return objects.slice().sort((a, b) => a[PropertyName] - b[PropertyName])
    //  const sortedArray = objects.slice().sort((a, b) => b[PropertyName] - a[PropertyName])
    //  return sortedArray.reverse()


    //this works as I am sorting a string and when manipulating a string it has to have localeCompare to work.
    // return objects.slice().sort((a, b) => {
    //     if (typeof a[PropertyName] === "string" && typeof b[PropertyName] === "string") {
    //         return a[PropertyName].localeCompare(b[PropertyName])
    //         } else {
    //             return a[PropertyName] - b[PropertyName]
    //         }
    // })
 }

const sortByName = sortByProperty(people, "age")

console.log(sortByName)