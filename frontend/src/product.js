class Product {

    static addProduct(json) {
            if (json['attributes']['id']) {
                const form = document.getElementById('')
                nameInput.classList.remove("error")
                nameInput.value = ''
                const main = document.getElementById('calc')
                const opt = document.createElement('option');
                opt.innerHTML = `${json["attributes"]['name']}`;
                opt.id = `${json['attributes']['id']}`
                main.appendChild(opt);
                main.options.selectedIndex = opt.index                
                //this.addForm(json)
            }
            else {
                const nameInput = document.getElementById('calc-name')
                nameInput.value = "Name Required"
                nameInput.className = 'error'
            }
        }

    //static addForm() {

    //}

    static newProduct(prod) {
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
            
        fetch(`${BACKEND_URL}/products`, configObj)
            .then(function(response) {
            return response.json();
            })
            .then(function(json) {
                this.addProduct(json["data"]);
            })
            .catch(function(error) {
            console.log(error);
            });
    }
}