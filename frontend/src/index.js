const BACKEND_URL = 'http://localhost:3000';

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

    async function f() {
        await Calculator.allFetch();
        Calculator.select(dropDown);
    }
    f();
})

function toDollar(num) {
    if (!!num.toString().split('.')[1])
        return `$${num.toFixed(2)}`
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