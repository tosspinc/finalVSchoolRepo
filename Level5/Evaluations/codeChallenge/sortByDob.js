// here is another method if it is using DOB as the sorting object.
const individuals = [
    { name: "arnold jones", age: 59, dob: "06/26/1964" },
    { name: "raquel jones", age: 54, dob: "03/10/1970" },
    { name: "melissa wierick", age: 34, dob: "03/22/1988" },
    { name: "nicole odekirk", age: 32, dob: "09/23/1989" },
    { name: "erin carrol", age: 30, dob: "02/04/1991" },
    { name: "emmanuel jones", age: 26, dob: "11/29/1994" },
    { name: "elijah Jones", age: 24, dob: "04/14/1996" },
    { name: "scarlett odekirk", age: 1, dob: "05/26/2023" }
]

individuals.sort((a, b) => {
    const dateA = new Date(a.dob)
    const dateB = new Date(b.dob)

    //this displays youngest first
    // if (dateA > dateB) return -1
    // if (dateB < dateA) return 1

    //this displays oldest first
    if (dateA < dateB) return -1
    if (dateA > dateB) return 1

    return a.name.localeCompare(b.name)
})

console.log(individuals)

