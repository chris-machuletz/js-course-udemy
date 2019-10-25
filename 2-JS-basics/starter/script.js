// var scoreJohn = (89 + 120 + 103) / 3;
// var scoreMike = (116 + 94 + 123) / 3;
// var scoreMary = (97 + 134 + 105) / 3;

// console.log(scoreJohn, scoreMike, scoreMary);

// if (scoreJohn > scoreMike && scoreJohn > scoreMary) {
//     console.log('John is the winner: ' + scroeJohn);
// } else if(scoreMike > scoreJohn && scoreMike > scoreMary) {
//     console.log('Mike is the winner: ' + scoreMike);
// } else if(scoreMary > scoreJohn && scoreMary > scoreMike) {
//     console.log('Mary is the winner: ' + scoreMary);
// } else {
//     console.log('There is a draw!');
// }

// var helloName = function(name) {
//     return 'Hello ' + name + '!'
// }

// console.log(helloName('Max'));

// var bills = [124, 48, 268];

// var tipCalculator = function(bill) {
//     if(bill < 50) {
//         return bill * 0.20;
//     } else if(bill >= 50 && bill < 200) {
//         return bill * 0.15;
//     } else {
//         return bill * 0.10;
//     }
// }

// var tips = []
// tips.push(tipCalculator(bills[0]));
// tips.push(tipCalculator(bills[1]));
// tips.push(tipCalculator(bills[2]));

// var finalBill = [];
// finalBill.push(bills[0] + tips[0]);
// finalBill.push(bills[1] + tips[1]);
// finalBill.push(bills[2] + tips[2]);

// console.log(tips, finalBill);

// var mark = {
//     firstName: 'Mark',
//     lastName: 'Doe',
//     mass: 64,
//     height: 1.74,
//     calcBMI: function() {
//         this.BMI = this.mass / (this.height ** 2);
//         return this.BMI;
//     }
// }

// var john = {
//     firstName: 'John',
//     lastName: 'Joe',
//     mass: 84,
//     height: 1.89,
//     calcBMI: function() {
//         this.BMI = this.mass / (this.height ** 2);
//         return this.BMI;
//     }
// }

// mark.calcBMI();
// john.calcBMI();

// if (mark.BMI > john.BMI) {
//     console.log(`${mark.firstName} has the highest BMI with ${mark.BMI}`);
// } else if (john.BMI > mark.BMI) {
//     console.log(`${john.firstName} has the highest BMI with ${john.BMI}`);
// } else {
//     console.log('Mark and John have the same BMI');
// }

// var john = ['John', 'Smith', 1990, 'designer', false, 'blue'];

// for (var i = john.length - 1; i >= 0; i--) {
//     console.log(john[i]);
// }

var john = {
    fullName: 'John Smith',
    bills: [124, 48, 268, 180, 42],
    tips: [],
    finalAmounts: [],
    calcTips: function() {
        for (var i = 0; i < this.bills.length; i++) {

            var bill = this.bills[i];
            var percentage;

            if (bill < 50) {
                percentage = .2;
            } else if (bill >= 50 && bill < 200) {
                percentage = .15;
            } else {
                percentage = .1;
            }

            this.tips[i] = bill * percentage;
            this.finalAmounts[i] = this.tips[i] + bill * percentage;
        }
    }
}

var mark = {
    fullName: 'Mark Miller',
    bills: [77, 375, 110, 45],
    tips: [],
    finalAmounts: [],
    calcTips: function() {
        for (var i = 0; i < this.bills.length; i++) {

            var bill = this.bills[i];
            var percentage;

            if (bill < 100) {
                percentage = .2;
            } else if (bill >= 100 && bill < 300) {
                percentage = .1;
            }
            else {
                percentage = .25;
            }

            this.tips[i] = bill * percentage;
            this.finalAmounts[i] = this.tips[i] + bill * percentage;
        }
    }
}

john.calcTips();
mark.calcTips();

console.log(john, mark);

function calcAvgTips(tipArr) {
    var sum = 0;
    for (var i = 0; i < tipArr.length; i++) {
        sum += tipArr[i];
    }
    return sum / tipArr.length;
}

john.average = calcAvgTips(john.tips);
mark.average = calcAvgTips(mark.tips);

console.log(john.average, mark.average);

if(john.average > mark.average) {
    console.log('John has the highest average Tip with ' + john.average);
} else if (mark.average > john.average) {
    console.log('Mark has the highest average Tip with ' + mark.average);
} else {
    console.log('Both tipped the same amount');
}