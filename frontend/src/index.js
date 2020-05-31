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