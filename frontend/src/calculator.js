class Calculator {
    static allFetch() {
        return fetch(`${BACKEND_URL}/calculators`)
        .then(resp => resp.json())
        .then(json => this.calculators(json)) 
    }

    static calculators(json) {
        const main = document.getElementById('calc')
        json.forEach(calculator => {
            const opt = document.createElement('option');
            opt.innerHTML = `${calculator['name']}`;
            opt.id = `${calculator['id']}`      
            main.appendChild(opt);
        })
    }

    static current(json) {
        const h1 = document.getElementById('current')
        h1.innerHTML = json["name"];
        const div = document.getElementById('info');
        div.innerHTML = `Individual Goal: ${json["individualGoal"]}`+` Monthly Goal: ${json["monthlyGoal"]}`
    }

    static select(dropDown) {
        const optionId = dropDown.options[dropDown.selectedIndex].id
        return fetch(`${BACKEND_URL}/calculators/${optionId}`)
        .then(resp => resp.json())
        .then(json => this.current(json))
    }
}