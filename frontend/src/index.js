console.log("In dere!")

const BACKEND_URL = 'http://localhost:3000';
fetch(`${BACKEND_URL}/test`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));

  fetch(`${BACKEND_URL}/calculators`)
  .then(response => response.json())
  .then(json => calculators(json));

  function calculators(json) {
    const main = document.getElementById('test')
    json.forEach(calculator => {
        const div = document.createElement('div');
        div.innerHTML = `${calculator['name']}`;      
        main.appendChild(div);
      })
  }