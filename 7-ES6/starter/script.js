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
