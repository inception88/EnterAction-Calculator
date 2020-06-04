class Product {

    static price(product) {
        const cost = product['attributes']['cost']
        const netPercentage = product['attributes']['netPercentage']
        const com = product['attributes']['commission']
        return cost/(1-(netPercentage/100)-(com/100))
    }
    
    static profit(product) {
        const cost = product['attributes']['cost']
        const com = product['attributes']['commission']
        return this.price(product)-cost-((com/100)*this.price(product))
    }

    static addProduct(json) {

        if (json['attributes']['id']) {
            const table = document.getElementById('products')
            const tr = document.createElement('tr');
            tr.id = `${json['attributes']['id']}`
            this.addRowData(tr, json, 'name')
            this.addRowData(tr, json, 'sales')
            this.addRowData(tr, json, 'cost')
            this.addRowData(tr, json, 'commission')
            this.addRowData(tr, json, 'frequency')
            this.addRowData(tr, json, 'netPercentage')
            this.addRowData(tr, json, 'profit')
            this.addRowData(tr, json, 'price')
            table.appendChild(tr);
        }
        else {
            alert("Product not added")
        }
    }

    static addRowData(tr, product, attribute) {
        const td = document.createElement('td');
        if (attribute == 'cost') {
            td.innerHTML = toDollar(`${product["attributes"][`${attribute}`]}`)
        }
        else if (attribute == 'commission' || attribute == 'netPercentage') {
            td.innerHTML = toPercent(`${product["attributes"][`${attribute}`]}`);
        }
        else if (attribute == 'price') {
            td.innerHTML = toDollar(this.price(product));
        }
        else if (attribute == 'profit') {
            td.innerHTML = toDollar(this.profit(product));
        }
        else {
            td.innerHTML = `${product["attributes"][`${attribute}`]}`;
        }      
        tr.appendChild(td);
    }
    //static addForm() {

    //}

    static newProduct(prod) {

        let formData = {
            name: `${prod.elements[0].value}`,
            sales: `${prod.elements[1].value}`,
            cost: `${prod.elements[2].value}`,
            commission: `${prod.elements[3].value}`,
            netPercentage: `${prod.elements[4].value}`,
            calculator_id: `${prod.elements[7].value}`
            };

        if (document.getElementById("monthly").checked) {
            formData.frequency = prod.elements[5].value
        }
        else {
            formData.frequency = prod.elements[6].value
        }
        
            let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
            };
            
        fetch(`${BACKEND_URL}/products`, configObj)
            .then(function(response) {
            return response.json();
            })
            .then(function(json) {
                Product.addProduct(json["data"]);
            })
            .catch(function(error) {
            console.log(error);
            });
    }
}