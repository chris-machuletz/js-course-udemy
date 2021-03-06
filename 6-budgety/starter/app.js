'use strict';

// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }
    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateTotal = function(type) {
        var total = 0;
        data.allItems[type].forEach(function(curr) {
            total += curr.value;
        });
        data.totals[type] = total;
    }

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, desc, val) {
            var newItem, id

            // Create the ID
            if (data.allItems[type].length === 0) {
                id = 0;
            } else {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            // Create new Item based on 'inc' or 'exp' type
            if (type === 'inc') {
                newItem = new Income(id, desc, val);
            } else if (type === 'exp') {
                newItem = new Expense(id, desc, val);
            }

            // Push into data structure
            data.allItems[type].push(newItem);

            // Return the new Item
            return newItem;

        },
        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map(function(curr) {
                return curr.id;
            });

            index = ids.indexOf(id);

            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        calculatePercentage: function() {
                data.percentage = data.allItems.exp.forEach(function(cur) {
                    cur.calcPercentage(data.totals.inc);
                });
        },
        getPercentages: function() {
            return data.allItems.exp.map(function(cur) {
                return cur.percentage;
            });
        },
        calculateBudget: function() {

            // Calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income that we spent
            if(data.totals.inc > 0 ) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else {
                data.percentage = -1;
            }
        },
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        testing: function () {
            console.log(data);
        }
    };

})();


// UI CONTROLLER
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeList: '.income__list',
        expensesList: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        itemPercentageLabel: '.item__percentage',
        titleDate: '.budget__title--month'
    }

    var formatNumber = function(num, type) {
        var numStr, numSplit;

        /**
         * 2000 -> + 2,000.00
         * 2345,2453 -> + 2,345.23
         */

        num = Math.abs(num); // remove sign -> 2000
        num = num.toFixed(2); // add 2 decimal places -> 2000.00

        numSplit = num.split('.');

        // add separator for thousands
        numStr = [];
        numSplit[0] = numSplit[0].split('').reverse().join(''); // 12345 -> 54321

        for(var i = 0; i < numSplit[0].length; i += 3) {
            numStr.push(numSplit[0].substr(i, 3)); // -> [543, 21]
        }

        numStr = numStr.map(function(cur){
            return cur.split('').reverse().join(''); // -> [345, 12]
        });

        numStr = numStr.reverse(); // -> [12, 345]
        
        numSplit[0] = numStr.join(','); // -> 12,345
        num = numSplit.join('.'); // -> 12,345.00

        return (type === 'inc' ? '+ ' : '- ') + num;
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        addListItem: function (obj, type) {
            var html, newHtml, element;

            if (type === 'inc') {
                element = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expensesList;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        removeListItem: function(item) {
            var el = document.getElementById(item);
            el.parentNode.removeChild(el);
        },
        clearFields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (current, index, array) {
                current.value = '';
            });
            fieldsArr[0].focus();
        },
        displayBudget: function(obj) {
            var type;
            obj.budget >= 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.itemPercentageLabel);

            var nodeListForEach = function(list, callback) {
                for(var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            }

            nodeListForEach(fields, function(cur, index) {

                if(percentages[index] >= 0) {
                    cur.textContent = percentages[index] + '%';
                } else {
                    cur.textContent = '---';
                }

            });
        },
        displayDate: function() {
            var now, year, month;

            now = new Date();
            year = now.getFullYear();
            month = now.toLocaleString('default', {month: 'long'});

            document.querySelector(DOMstrings.titleDate).textContent = month + ' ' + year;
        },
        DOM: function () {
            return DOMstrings;
        }
    }

})();


// GLOBAL APP CONTROLLER
var appController = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.DOM();

        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function () {

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget on UI
        UICtrl.displayBudget(budget);
    };
    var updatePercentages = function() {

        // 1. Calculate percentages
        budgetCtrl.calculatePercentage();

        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update the UI with the new percentages
        UIController.displayPercentages(percentages);

    }
    var ctrlAddItem = function () {
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // 2. Add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var targetID, splitID, type, ID;

        targetID = event.target.parentNode.parentNode.parentNode.parentNode.id

        // If ID of target is set
        if(targetID) {
            splitID = targetID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. Remove item from data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Remove item from UI
            UIController.removeListItem(targetID);

            // 3. Update budget in UI
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();
        }
    }

    return {
        init: function () {
            console.log('Application has started...');
            UICtrl.displayDate();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            
            setupEventListeners();
        }
    }


})(budgetController, UIController);

appController.init();