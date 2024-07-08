function sortByMultipleCriteria(people) {
    return people.sort((a, b) => {
     //compares the ages of the people.
     if(a.age !== b.age) {  //checks to see if ages equal one another.
         return a.age - b.age; //returns list of names by order of age.
         } else {
             return a.name.localeCompare(b.name); //puts names in alphabetical order
         }
    });
 }
 
 const people = [
 { name: 'Alice', age: 30 },
 { name: 'Bob', age: 25 },
 { name: 'Charlie', age: 35 },
 { name: 'David', age: 25 },
 ];
 
 const sortedPeople = sortByMultipleCriteria(people);
 console.log(sortedPeople);
 
 //the results if done correctly should be:
 //[
 // { name: 'Bob', age: 25 },
 // { name: 'David', age: 25 },
 // { name: 'Alice', age: 30},
 // { name: 'Charlie', age: 35}
 //]
 //which it is...