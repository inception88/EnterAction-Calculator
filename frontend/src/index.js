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
        main.appendChild(opt);
    })
}

function select(dropDown) {
    console.log(dropDown.value)
}
