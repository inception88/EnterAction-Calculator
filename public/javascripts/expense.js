class Expense {

    static update(expense) {

        if (!("error" in expense)) {
            const table = document.getElementById("expenses")
            const row = table.rows.namedItem(expense['id'])
            row.cells[0].firstElementChild.value = expense['attributes']["name"]
            row.cells[1].firstElementChild.value = expense['attributes']["quantity"]
            row.cells[2].firstElementChild.value = toDollar(expense['attributes']["cost"])
            row.cells[3].firstElementChild.value = expense['attributes']["frequency"]
        }
        else {
            let array = [];
            for (let [key, value] of Object.entries(expense['error'])) {
                array.push(`${key} ${value}`);
            }
            alert((array))
        }
    }

    static addExpense(json) {

        if (!("error" in json)) {
                this.removeClass("expense-name")
                this.removeClass("cost")
                const expense = json
                const table = document.getElementById('expenses')
                const tr = document.createElement('tr');
                tr.id = `${expense['attributes']['id']}`
                this.addRowData(tr, expense, 'name')
                this.addRowData(tr, expense, 'quantity')
                this.addRowData(tr, expense, 'cost')
                this.addRowData(tr, expense, 'frequency')
                const button = document.createElement('button');
                button.innerText = "Update"
                button.id = `${expense['attributes']['id']}`
                button.className = "vertical-center"
                button.addEventListener("click", function() {
                    Expense.updateExpense(tr);
                });
                const button2 = document.createElement('button');
                button2.innerText = "Delete"
                button2.id = `${expense['attributes']['id']}`
                button2.className = "vertical-center"
                button2.addEventListener("click", function() {
                            Expense.deleteExpense(expense['attributes']['id']);
                        });
                tr.appendChild(button);
                tr.appendChild(button2);
                table.appendChild(tr);
        }
        else {
            let array = [];
            for (let [key, value] of Object.entries(json['error'])) {
                array.push(`${key} ${value}`);
                if (key == 'name') {
                    const input = document.getElementById('expense-name')
                    input.className = 'error'
                }
                else {
                    const input = document.querySelectorAll('#cost')[1]
                    input.className = 'error'
                }
            }
            alert((array))
        }
    }

    static addRowData(tr, expense, attribute) {
        const td = document.createElement('td');
        td.style = 'width: 22%'
        const input = document.createElement('input');
        if (attribute == 'cost') {
            input.value = toDollar(expense["attributes"][attribute])
        }
        else {
            input.value = `${expense["attributes"][`${attribute}`]}`;
        }
        input.className = "expense-input"
        td.appendChild(input)
        tr.appendChild(td);
    }

    static removeClass(id) {
        if (id == 'expense-name') {
            document.getElementById(id).classList.remove("error");
        }
        else {
            document.querySelectorAll('#cost')[1].classList.remove("error");
        }
    }

    static delete(expense) {
        const table = document.getElementById("expenses")
        const row = table.rows.namedItem(expense['id'])
        alert(`${row.cells[0].firstElementChild.value} Has Been Deleted`)
        row.remove()
    }

    static newExpense(expense) {
        let formData = {
            name: `${expense.elements[0].value}`,
            quantity: `${expense.elements[1].value}`,
            cost: `${expense.elements[2].value}`,
            calculator_id: `${expense.elements[5].value}`
            };

        if (document.getElementById("exp-monthly").checked) {
            formData.frequency = expense.elements[3].value
        }
        else {
            formData.frequency = expense.elements[4].value
        }
        
            let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
            };
            
        fetch(`${BACKEND_URL}/expenses`, configObj)
            .then(function(response) {
            return response.json();
            })
            .then(function(json) {
                Expense.addExpense(json['data']);
            })
            .catch(function(error) {
            console.log(error);
            });
    }

    static updateExpense(expense) {
        let formData = {
            name: expense.cells[0].firstElementChild.value,
            quantity: expense.cells[1].firstElementChild.value,
            cost: toNumber(expense.cells[2].firstElementChild.value),
            frequency: expense.cells[3].firstElementChild.value
            };
            
            let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
            };
        fetch(`${BACKEND_URL}/expenses/${expense.id}`, configObj)
            .then(function(response) {
            return response.json();
            })
            .then(function(json) {
                Expense.update(json["data"]);
            })
            .catch(function(error) {
            console.log(error);
            });
    }

    static deleteExpense(id) {
        let formData = {
            id: id
            };
            
            let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
            };
            
        fetch(`${BACKEND_URL}/expenses/${id}`, configObj)
            .then(function(response) {
            return response.json();
            })
            .then(function(json) {
                Expense.delete(json);
            })
            .catch(function(error) {
            console.log(error);
            });
    }
}