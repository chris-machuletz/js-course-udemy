
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
// name6 = 'Jane Miller';
// console.log(name6);

/**
 * Blocks and IIFEs
 */

// ES6
{
  const a = 1;
  let b = 2;
  var c = 3;
}
//  console.log(a + b);
console.log(c);

// ES5
(function () {
  var a = 1;
  var b = 2;
  var c = 3;
})();

/**
 * Strings
 */

let firstName = 'john';
let lastName = 'smith';
const yearOfBirth = 1990;

function calcAge(year) {
  return 2016 - year;
}

// console.log(`This is ${firstName} ${lastName}.`);
// console.log('This is ' + firstName + ' ' + lastName + '.');

let fullName = 'John Smith';
fullName.startsWith('J');
fullName.endsWith('h');
fullName.includes('Sm');
fullName.repeat(5);

/**
 * Arrow Functions
 */

const years = [1954, 1986, 1975, 1982];

// ES5
var ages5 = years.map(function (el) {
  return 2019 - el;
});
console.log(ages5);

// ES6
var ages6 = years.map(el => 2019 - el);
console.log(ages6);

ages6 = years.map((el, index) => `${index}: ${2019 - el}`);
console.log(ages6);

ages6 = years.map((el, index) => {
  let year = new Date().getFullYear();
  let age = year - el;
  return `${index}: ${age}`;
});
console.log(ages6);

let Person = function (name) {
  this.name = name;
};

Person.prototype.myFriends = function (friends) {
  let arr = friends.map(el => `${this.name} is friends with ${el}`);
  console.log(arr);
};

let friends = ['Dave', 'Jane', 'Bob']
let john = new Person('John').myFriends(friends);

/**
 * Destructuring
 */

const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
  firstname: 'John',
  lastname: 'Smith'
}

const { firstname, lastname } = obj;
console.log(firstname, lastname);

const { firstname: a, lastname: b } = obj;
console.log(a, b);

/**
 * Arrays
 */

const boxes = document.querySelectorAll('.box');

// Convert list to array
// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (cur) {
  cur.style.background = 'orangered';
})

// ES6
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach(cur => cur.style.background = 'dodgerblue');



// Loop over array, use break & continue
// ES5
for (let i = 0; i < boxesArr5.length; i++) {
  if (boxesArr5[i].className === 'box blue') {
    continue;
  }
  boxesArr5[i].textContent = 'I changed to blue!';
}

// ES6
for (const cur of boxesArr6) {
  if (cur.className.includes('blue')) continue;
  cur.textContent = 'I changed to blue!';
}

// Find elements in an array
// ES5
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function (cur) {
  return cur >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6
// findIndex() returns index where callback returns true
console.log(ages.findIndex(cur => cur >= 18));
// find() returns element where callback returns true
console.log(ages.find(cur => cur >= 18));

/**
 * Spread operator
 */
const h1 = document.querySelector('h1');
const boxes2 = document.querySelectorAll('.box');
const all = [...boxes2, h1];

Array.from(all).forEach(cur => cur.style.color = 'purple');

/**
 * REST parameters
 * Converts multiple function parameters to an array to be used in the function
 */

/*
// ES5
function isFullAge5() {
  var argsArr = Array.prototype.slice.call(arguments);

  console.log(argsArr);

  argsArr.forEach(function(cur) {
    console.log((2019 - cur) >= 18);
  });
}
//isFullAge5(1990, 2005, 1965, 2016, 1987);

// ES6
function isFullAge6(...years) {
  years.forEach(cur => console.log((2019 - cur) >= 18))
}
isFullAge6(1990, 2005, 1965, 2016, 1987);
*/

// ES6
function isFullAge6(fullAge, ...years) {
  years.forEach(cur => console.log((2019 - cur) >= fullAge))
}
isFullAge6(1990, 2005, 1965, 2016, 1987, 18);

/**
 * Default parameters
 */

 // ES5
function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {

  lastName === undefined ? lastName = 'Smith' : lastName = lastName;
  nationality === undefined ? nationality = 'american' : nationality = nationality;

  this.firstName = firstName;
  this.lastname = lastName;
  this.yearOfBirth = yearOfBirth;
  this.nationality = nationality;
}

var mark5 = new SmithPerson5('Mark', 1990);
var emily5 = new SmithPerson5('Emily', 1983, 'Diaz', 'spanish');

// ES6
function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'american') {
  this.firstName = firstName;
  this.lastname = lastName;
  this.yearOfBirth = yearOfBirth;
  this.nationality = nationality;
}

var mark6 = new SmithPerson6('Mark', 1990);
var emily6 = new SmithPerson6('Emily', 1983, 'Diaz', 'spanish');

/**
 * Maps
 */

const question = new Map();
question.set('question', 'What is a microphone?');
question.set(1, 'yes');
question.set(2, 'no');
question.set('correct', 1);
question.set(true, 'Correct answer');
question.set(false, 'Wrong answer, please try again.');

console.log(question.get('question'));
console.log(question.size);

// Delete item
//question.delete(2);

// check if key is in map
if(question.has(1)) {
  //question.delete(1);
  console.log('Key 1 is in the map!')
}

// emtpy the map
//question.clear();

// Loop through map
//question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));

for(let [key, value] of question.entries()) {
  //console.log(`This is ${key}, and it's set to ${value}`);
  if(typeof(key) === 'number') {
    console.log(`Answer ${key} is ${value}`);
  }
}

const ans = parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));

/**
 * Classes
 */

 // ES5
 var Person5 = function(name, yearOfBirth, job) {
   this.name = name;
   this.yearOfBirth = yearOfBirth;
   this.job = job;
 }

 Person5.prototype.calculateAge = function() {
   var age = new Date().getFullYear - this.yearOfBirth;
   console.log(age);
 }

 var john5 = new Person5('John', 1990, 'teacher');

 // ES6
 class Person6 {
   constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
   }
   calculateAge() {
    let age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
   }

   static greeting() {
     console.log('Hey there');
   }
 }

 const john6 = new Person6('John', 1990, 'teacher');
 Person6.greeting();