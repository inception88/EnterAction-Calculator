class Product {
    
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
                Calculator.addCalc(json["data"]);
            })
            .catch(function(error) {
            console.log(error);
            });
    }
}