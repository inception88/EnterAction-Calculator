const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", () => {
        
        const dropDown = document.getElementById('calc')
        dropDown.addEventListener("change", function() {select(dropDown)});
        fetchCalculators();
        
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
    const main = document.getElementById('current')
    main.innerHTML = json["name"];
    const div = document.createElement('div');
    div.innerHTML = `Individual Goal: ${json["individualGoal"]}`+` Monthly Goal: ${json["monthlyGoal"]}`
    main.appendChild(div)
}

function select(dropDown) {
    optionId = dropDown.options[dropDown.selectedIndex].id
    return fetch(`${BACKEND_URL}/calculators/${optionId}`)
    .then(resp => resp.json())
    .then(json => calculator(json))
}