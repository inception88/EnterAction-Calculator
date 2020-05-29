const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", () => {
        
        const dropDown = document.getElementById('calc')
        dropDown.addEventListener("change", function() {select(dropDown)});
        
        async function f() {
            await fetchCalculators();
            select(dropDown)();
        }
        
        f();
})

function fetchCalculators() {
    return fetch(`${BACKEND_URL}/calculators`)
    .then(resp => resp.json())
    .then(json => calculators(json)) 
}

function calculators(json) {
    const main = document.getElementById('calc')
    json.forEach(calculator => {
        const opt = document.createElement('option');
        opt.innerHTML = `${calculator['name']}`;
        opt.id = `${calculator['id']}`      
        main.appendChild(opt);
    })
}

function calculator(json) {
    const h1 = document.getElementById('current')
    h1.innerHTML = json["name"];
    const div = document.getElementById('info');
    div.innerHTML = `Individual Goal: ${json["individualGoal"]}`+` Monthly Goal: ${json["monthlyGoal"]}`
}

function select(dropDown) {
    optionId = dropDown.options[dropDown.selectedIndex].id
    return fetch(`${BACKEND_URL}/calculators/${optionId}`)
    .then(resp => resp.json())
    .then(json => calculator(json))
}