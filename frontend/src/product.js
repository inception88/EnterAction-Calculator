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

        if (!("error" in json)) {
            this.removeClass("product-name")
            this.removeClass("cost")
            this.removeClass("commission")
            this.removeClass("netPercentage")
            const product = json['data']
            const table = document.getElementById('products')
            const tr = document.createElement('tr');
            tr.id = `${product['attributes']['id']}`
            this.addRowData(tr, product, 'name')
            this.addRowData(tr, product, 'sales')
            this.addRowData(tr, product, 'cost')
            this.addRowData(tr, product, 'commission')
            this.addRowData(tr, product, 'frequency')
            this.addRowData(tr, product, 'netPercentage')
            this.addRowData(tr, product, 'profit')
            this.addRowData(tr, product, 'price')
            table.appendChild(tr);
        }
        else {
            let array = [];
            for (let [key, value] of Object.entries(json['error'])) {
                array.push(`${key} ${value}`);
                if (key == 'name') {
                    const input = document.getElementById('product-name')
                    input.className = 'error'
                }
                else {
                    const input = document.getElementById(key)
                    input.className = 'error'
                }
            }
            alert((array))
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

    static removeClass(id) {
        document.getElementById(id).classList.remove("error");
    }

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
                Product.addProduct(json);
            })
            .catch(function(error) {
            console.log(error);
            });
    }
}