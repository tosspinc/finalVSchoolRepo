part 1: writing a function that will sort anagrams.

```jsx
//this takes a word as input. Takes the word and converts it to lowercase. Then it splits the word into an array of characters. Then it sorts the characters alphabetically. then it rejoins the letters to form a new word string. 

function sortWord(word) {
    return word.toLowerCase().split('').sort().join('');
}

//sorts the target word.
function filterAnagrams(arr, target) {
    const sortedTarget = sortWord(target);

//this filters the array and makes sure it inclueds only words that are anagrams.
    return arr.filter(word => sortWord(word) === sortedTarget);
}

const words = ['listen', 'silent', 'dog', 'god', 'hello', 'world'];
const target = 'enlist';

const anagrams = filterAnagrams(words, target);
console.log(anagrams); //output: ['listen', 'silent']
```

part 2: Write a function called **`sortByMultipleCriteria`** that takes an array of objects representing people, each with a **`name`** (string) and **`age`** (number) property. The function should return a new array with the people sorted first by age in ascending order, and then by name in alphabetical order.

```jsx
function sortByMultipleCriteria(people) {
   return people.sort((a, b) => {
    //compares the ages of the people.
    if(a.age !== b.age)
        return a.age - b.age //returns list of names by order of age.
        } else {
            return a.age.localCompare(b.name) //puts names in alphabetical order
        }
   })
}

const people = [
{ name: 'Alice', age: 30 },
{ name: 'Bob', age: 25 },
{ name: 'Charlie', age: 35 },
{ name: 'David', age: 25 },
];

const sortedPeople = sortByMultipleCriteria(people);
console.log(sortedPeople);

// Expected outcome: [
//  { name: 'Bob', age: 25 },
//  { name: 'David', age: 25 },
//  { name: 'Alice', age: 30 },
//  { name: 'Charlie', age: 35 }
// ]
```
quiz results: 100% 8/8
*************
How do you provide data to components using createContext and useContext?
*
1/1
by passing data as a prop to the component
by using the setState function
x by using the useContext hook and a context provider
 
by storing data in the components local state
Feedback
By using the `useContext` hook and a context provider.
- Explanation: To provide data to components using `createContext` and `useContext`, you wrap the relevant part of your component tree with a context provider using `MyContext.Provider`, and then use the `useContext` hook within components to consume the context value. This allows you to share data across components without the need for explicit prop passing.
***************** 
How can you access the value provided by a context using useContext inside a component?
*
1/1
x const value = useContext(MyContext)
 
const value = useContext(MyContext.value)
const value = MyContext.useContext()
const value = this.context.value
Feedback
The correct way to wrap components with a context provider is shown in option A. You use the context object (`MyContext`) along with the `Provider` component to wrap the portion of the component tree that should have access to the context value.

********************* 
Which of the following is a correct way to wrap components with a context provider?
*
1/1
```
x <MyContext.Provider value="data">...</MyContext.Provider>
 
<ContextProvider value="data">...</ContextProvider>
<Context.Provider data="data">...</Context.Provider>
<MyContext.Provider data="data">...</MyContext.Provider>
Feedback
The correct way to access the value provided by a context using `useContext` is to use the syntax shown in option A. The `useContext` hook takes the context object returned by `createContext` and returns the context value associated with it.
*********************

Context in React can only be used to manage state; it cannot be used to share functions between components
*
1/1
True
x False
 
Feedback
This statement is False. Context in React can be used not only to manage state but also to share functions, themes, and other data between components. It provides a way to pass data down the component tree without the need for prop drilling.

*********************
Context provides a way to avoid prop drilling, which is the process of passing props through intermediate components that do not need the data.
*
1/1
x True
 
False
Feedback
This statement is True. Context is a feature in React that helps prevent prop drilling by allowing data to be passed directly to deeply nested components without the need to pass the data through intermediary components. This leads to cleaner and more maintainable code.
 
********************* 
What is the purpose of a React fragment?
*
1/1
Fragments are used to create standalone components.
x Fragments are used to group multiple elements without adding an extra DOM node.
 
Fragments are a replacement for state management libraries.
Fragments are used for routing in React applications.
Feedback
Fragments are used to group multiple elements without adding an extra DOM node.
Explanation: React fragments allow you to group multiple JSX elements without introducing an additional wrapping <div> or any other DOM element. This helps keep the DOM structure clean and more efficient.

********************* 
 Using a React fragment can improve performance by reducing the number of DOM nodes
*
1/1
x True
 
False
Feedback
This statement is true. Fragments help improve performance by avoiding the creation of unnecessary DOM nodes. Without fragments, grouping elements would require additional wrapping elements, which could negatively impact performance and lead to more complex CSS styling.

********************* 
React's props.children allows you to access and render the content placed between the opening and closing tags of a component?
*
1/1
x True
 
False
Feedback
This statement is true. React's props.children provides a way to access and render any content that is placed between the opening and closing tags of a component when it is used.
This form was created inside of V SCHOOL. Report Abuse
