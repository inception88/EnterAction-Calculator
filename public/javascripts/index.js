//const BACKEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'https://enteraction-calculator.herokuapp.com/';
var individualProductExpenses;
var monthlyProductExpenses;


document.addEventListener("DOMContentLoaded", () => {
        
    const dropDown = document.getElementById('calc')
    dropDown.addEventListener("change", function() {Calculator.select(dropDown)});
    const newCalc = document.getElementById("new-calc")
    newCalc.addEventListener("submit", function(e) {
        e.preventDefault();
        Calculator.newCalc(newCalc);
    });
    const updateCalc = document.getElementById("update-calc") 
    updateCalc.addEventListener("submit", function(e) {
        e.preventDefault();
        Calculator.updateCalc(updateCalc, dropDown.options[dropDown.selectedIndex].id);
    });
    const deleteCalc = document.getElementById("delete-calc") 
    deleteCalc.addEventListener("click", function() {
        Calculator.deleteCalc(dropDown.options[dropDown.selectedIndex].id);
    });
    const newProduct = document.getElementById("new-product")
    newProduct.addEventListener("submit", function(e) {
        e.preventDefault();
        Product.newProduct(newProduct);
    });
    const newExpense = document.getElementById("new-expense")
    newExpense.addEventListener("submit", function(e) {
        e.preventDefault();
        Expense.newExpense(newExpense);
    });
    const updateTotals = document.getElementById("totals-calc") 
    updateTotals.addEventListener("click", function() {
        Total.update(dropDown.options[dropDown.selectedIndex].id);
    });

    async function f() {
        await Calculator.allFetch();
        Calculator.select(dropDown);
    }
    f();
})

function toDollar(num) {
    if (!!num.toString().split('.')[1])
        if (num.toString().split('.')[1].substr(0,2) != '00')
            return `$${num.toFixed(2)}`
        else
            return `$${num.toFixed()}`
    else
        return `$${num}`
}

function toPercent(num) {
    if (!!num.toString().split('.')[1])
        return `${num.toFixed(2)}%`
    else
        return `${num}%`
}

function toNumber(string) {
    if (string.charAt(0) == '$') {
        const newString = string.substr(1)
        return parseFloat(newString)
    }
    else {
        return parseFloat(string)
    }
}