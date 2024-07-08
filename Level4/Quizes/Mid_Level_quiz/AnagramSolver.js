// function sortWord(word) {
//     return word.toLowerCase().replace(/\s/g, '').split('').sort().join('');
// }

// function filterAnagrams(arr, target) {
//     const sortedTarget = sortWord(target);
//     return arr.filter(word => {
//         const sortedWord = sortWord(word);
//         console.log(`Comparing ${sortedWord} with ${sortedTarget}`);
//         return sortedWord === sortedTarget && word !== target;
//     });
// }

// const words = ['listen', 'silent', 'dog', 'god', 'hello', 'world', 'bad credit', 'debit card'];
// const target = 'enlist';

// const anagrams = filterAnagrams(words, target);
// console.log(anagrams); // Output: ['listen', 'silent'] as listen is an anagram of itself as is silent. dog and god are anagrams of each other. the others do not have an anagram for the word in this list of words.  anagrams are creating other words from that current word. debit card is bad credit.  letters rearranged.

//for multiple Words.

// function sortWord(word) {
//     // Split the word into characters, sort them, then join them back
//     return word.toLowerCase().split('').filter(char => char !== '').sort().join('');
// }

// function filterAnagrams(arr, target) {
//     const sortedTarget = sortWord(target);
//     const wordMap = {};

//     // Create a map where sorted words are keys and original words are values
//     arr.forEach(word => {
//         // Concatenate the word with spaces
//         const concatenatedWord = word.replace(/\s/g, '');
//         const sortedWord = sortWord(concatenatedWord);
//         if (!wordMap[sortedWord]) {
//             wordMap[sortedWord] = [];
//         }
//         // Check if the word already exists in the array before pushing
//         if (!wordMap[sortedWord].includes(concatenatedWord)) {
//             wordMap[sortedWord].push(concatenatedWord);
//         }
//         if (!wordMap[sortedWord].includes(word)) {
//             wordMap[sortedWord].push(word);
//         }
//     });

//     // Include the target word without spaces in the word map
//     if (!wordMap[sortedTarget]) {
//         wordMap[sortedTarget] = [];
//     }
//     wordMap[sortedTarget].push(target);

//     console.log('Word Map:', wordMap);

//     // Get the anagrams of the target word from the map
//     const anagrams = wordMap[sortedTarget] || [];

//     console.log('Anagrams:', anagrams);

//     // Check for anagrams in the word list
//     const wordAnagrams = arr.filter(word => sortWord(word) === sortedTarget && word !== target);

//     console.log('Word List Anagrams:', wordAnagrams);

//     // Combine anagrams from both the word map and the word list
//     const allAnagrams = [...anagrams, ...wordAnagrams];

//     console.log('All Anagrams:', allAnagrams);

//     return allAnagrams;
// }

// const words = ['listen', 'silent', 'dog', 'god', 'hello', 'world', 'bad credit', 'debit card'];
// const target = 'enlist';

// const anagrams = filterAnagrams(words, target);
// console.log(anagrams);

// function sortWord(word) {
//     // Split the word into characters, sort them, then join them back
//     return word.toLowerCase().split('').filter(char => char !== '').sort().join('');
// }

// function filterAnagrams(arr, target) {
//     const sortedTarget = sortWord(target);
//     const wordMap = {};

//     // Create a map where sorted words are keys and original words/phrases are values
//     arr.forEach(phrase => {
//         // Split the phrase into individual words
//         const words = phrase.split(' ');
//         // Consider both the original phrase and individual words
//         words.forEach(word => {
//             // Concatenate the word without spaces
//             const concatenatedWord = word.replace(/\s/g, '');
//             const sortedWord = sortWord(concatenatedWord);
//             if (!wordMap[sortedWord]) {
//                 wordMap[sortedWord] = [];
//             }
//             // Check if the word already exists in the array before pushing
//             if (!wordMap[sortedWord].includes(concatenatedWord)) {
//                 wordMap[sortedWord].push(concatenatedWord);
//             }
//             if (!wordMap[sortedWord].includes(word)) {
//                 wordMap[sortedWord].push(word);
//             }
//         });
//         // Also include the original phrase
//         const sortedPhrase = sortWord(phrase.replace(/\s/g, ''));
//         if (!wordMap[sortedPhrase]) {
//             wordMap[sortedPhrase] = [];
//         }
//         if (!wordMap[sortedPhrase].includes(phrase)) {
//             wordMap[sortedPhrase].push(phrase);
//         }
//     });

//     // Include the target word without spaces in the word map
//     if (!wordMap[sortedTarget]) {
//         wordMap[sortedTarget] = [];
//     }
//     wordMap[sortedTarget].push(target);

//     console.log('Word Map:', wordMap);

//     // Get the anagrams of the target word from the map
//     const anagrams = wordMap[sortedTarget] || [];

//     console.log('Anagrams:', anagrams);

//     // Check for anagrams in the word list
//     const wordAnagrams = arr.filter(phrase => {
//         const words = phrase.split(' ');
//         return words.some(word => sortWord(word) === sortedTarget && word !== target);
//     });

//     console.log('Word List Anagrams:', wordAnagrams);

//     // Combine anagrams from both the word map and the word list
//     const allAnagramsSet = new Set([...anagrams, ...wordAnagrams]);

//     const allAnagrams = [...allAnagramsSet];

//     console.log('All Anagrams:', allAnagrams);

//     return allAnagrams;
// }

// const words = ['listen', 'silent', 'dog', 'god', 'hello', 'world'];
// const target = 'gdo';

// function filterAnagrams(arr, target){
//     const sortTarget = target.split("").sort().join("")
//     const filteredArr = arr.filter(word => {
//         const sortedWord = word.split("").sort().join("")
//         return sortTarget === sortedWord
//     })
//     return filteredArr
// }

// const anagrams = filterAnagrams(words, target);
// console.log(anagrams);


function palindrome(arr){
    return arr.filter(word => {
        console.log(word)
        const reversedWord = word.split("").reverse().join("")
        console.log(reversedWord)
        if (word === reversedWord){
            return word
        }
    })
    
}


 
const newWords = ['listen', 'silent', 'dog', 'god','lol', 'dad', 'hello', 'world'];
console.log(palindrome(newWords))