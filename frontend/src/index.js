const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", () => {
        
        const dropDown = document.getElementById('calc')
        dropDown.addEventListener("change", function() {Calculator.select(dropDown)});
        
        async function f() {
            await Calculator.allFetch();
            Calculator.select(dropDown);
        }
        f();
})