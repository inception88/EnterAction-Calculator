class Calculator {
    static allFetch() {
        return fetch(`${BACKEND_URL}/calculators`)
        .then(resp => resp.json())
        .then(json => this.all(json["data"])) 
    }

    static all(json) {
        const main = document.getElementById('calc')
        json.forEach(calculator => {
            const opt = document.createElement('option');
            opt.innerHTML = `${calculator["attributes"]['name']}`;
            opt.id = `${calculator['attributes']['id']}`      
            main.appendChild(opt);
        })
    }

    static current(json) {
        const h1 = document.getElementById('current')
        h1.innerHTML = json['attributes']["name"];
        const table = document.getElementById('table');
        const individualGoal = table.rows[1].cells[5];
        const monthlyGoal = table.rows[2].cells[5];
        individualGoal.innerHTML = toDollar(json['attributes']["individualGoal"])
        monthlyGoal.innerHTML = toDollar(json['attributes']["monthlyGoal"])
    }

    static select(dropDown) {
        const optionId = dropDown.options[dropDown.selectedIndex].id
        return fetch(`${BACKEND_URL}/calculators/${optionId}`)
        .then(resp => resp.json())
        .then(json => this.current(json["data"]))
    }

    static newCalc(calc) {
        console.log(calc.elements[0].value)
    }
}