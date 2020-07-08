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
    static allExpenses(json) {
        const table = document.getElementById('expenses')
        Array.from(table.rows).forEach( row => {
            if (row.id)
                row.remove()
        })
        json.forEach(expense => {
            Expense.addExpense(expense)
        })
        Total.expenseTotals(json)
    }

    static allProducts(json) {
        const table = document.getElementById('products')
        Array.from(table.rows).forEach( row => {
            if (row.id)
                row.remove()
        })
        json.sort(function(a, b){
            if(a['attributes']['name'] < b['attributes']['name']) { return -1; }
            if(a['attributes']['name'] > b['attributes']['name']) { return 1; }
            return 0;
        })
        json.forEach(product => {
            Product.addProduct(product)
        })
        Total.productTotals(json)
    }

    static getExpenses(id) {
        return fetch(`${BACKEND_URL}/calculators/${id}/expenses`)
        .then(resp => resp.json())
        .then(json => this.allExpenses(json["data"]))
    }

    static getProducts(id) {
        return fetch(`${BACKEND_URL}/calculators/${id}/products`)
        .then(resp => resp.json())
        .then(json => this.allProducts(json["data"]))
    }

    static addCalc(json) {
        if (json['attributes']['id']) {
            const nameInput = document.getElementById('calc-name')
            nameInput.classList.remove("error")
            nameInput.value = ''
            const main = document.getElementById('calc')
            const opt = document.createElement('option');
            opt.innerHTML = `${json["attributes"]['name']}`;
            opt.id = `${json['attributes']['id']}`
            main.appendChild(opt);
            main.options.selectedIndex = opt.index                
            this.current(json)
        }
        else {
            const nameInput = document.getElementById('calc-name')
            nameInput.value = "Name Required"
            nameInput.className = 'error'
        }
    }

    static updateDropDown(json) {
        const selector = Array.from(document.getElementById('calc'));
        const opt = selector.find(option => { 
            return option.id == json['attributes']['id']
        })
        opt.innerHTML = json["attributes"]['name'];
    }

    static deleteDropDown(json) {
        const selector = (document.getElementById('calc'));
        const opt = Array.from(selector).find(option => { 
            return option.id == json['id']
        })
        alert(`${opt.innerHTML} Has Been Deleted`)
        opt.remove()
        this.select(selector)
    } 

    static current(json) {
        const h1 = document.getElementById('current')
        h1.innerHTML = json['attributes']["name"];
        const name = document.getElementById('update-calc-name')
        name.value = json['attributes']["name"]
        const iG = document.getElementById('individualGoal')
        iG.value = json['attributes']["individualGoal"]
        const mG = document.getElementById('monthlyGoal')
        mG.value = json['attributes']["monthlyGoal"]
        const table = document.getElementById('totals');
        const individualGoal = table.rows[1].cells[5];
        const monthlyGoal = table.rows[2].cells[5];
        individualGoal.innerHTML = toDollar(json['attributes']["individualGoal"])
        monthlyGoal.innerHTML = toDollar(json['attributes']["monthlyGoal"])
        table.rows[3].cells[5].innerHTML = toDollar(json['attributes']["monthlyGoal"]*12)
        table.rows[4].cells[5].innerHTML = toDollar((json['attributes']["monthlyGoal"]*12)+json['attributes']["individualGoal"])
        const input = document.getElementById('calc_id')
        const input2 = document.getElementById('calc_id2')
        input.value = json['attributes']["id"]
        input2.value = json['attributes']["id"]
        Total.update(json['attributes']["id"])
    }

    static select(dropDown) {
        const optionId = dropDown.options[dropDown.selectedIndex].id
        return fetch(`${BACKEND_URL}/calculators/${optionId}`)
        .then(resp => resp.json())
        .then(json => this.current(json["data"]))
    }

    static newCalc(calc) {
        let formData = {
            name: `${calc.elements[0].value}`
            };
            
            let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
            };
            
        fetch(`${BACKEND_URL}/calculators`, configObj)
            .then(function(response) {
            return response.json();
            })
            .then(function(json) {
                Calculator.addCalc(json["data"]);
            })
            .catch(function(error) {
            console.log(error);
            });
    }

    static updateCalc(calc, id) {
        let formData = {
            name: `${calc.elements[0].value}`,
            individualGoal: `${calc.elements[1].value}`,
            monthlyGoal: `${calc.elements[2].value}`
            };
            
            let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
            };
            
        fetch(`${BACKEND_URL}/calculators/${id}`, configObj)
            .then(function(response) {
            return response.json();
            })
            .then(function(json) {
                Calculator.current(json["data"]);
                Calculator.updateDropDown(json["data"]);
            })
            .catch(function(error) {
            console.log(error);
            });
    }

    static deleteCalc(id) {
        let formData = {
            id: `${id}`
            };
            
            let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
            };
            
        fetch(`${BACKEND_URL}/calculators/${id}`, configObj)
            .then(function(response) {
            return response.json();
            })
            .then(function(json) {
                Calculator.deleteDropDown(json);
            })
            .catch(function(error) {
            console.log(error);
            });
    }
}