class Total {

    static sales(prod) {
        console.log(prod)
        let monthlySales = 0;
        let individualSales = 0;
        prod.forEach(product => {
            if (product['attributes']['frequency'] == "individual") {
                individualSales += product['attributes']['sales']
            }
            else {
                monthlySales += product['attributes']['sales']
            }
        })
        const table = document.getElementById('totals')
        const iS = table.rows[1].cells[1];
        const mS = table.rows[2].cells[1];
        const aS = table.rows[3].cells[1];
        const totalSales = table.rows[4].cells[1];
        iS.innerHTML = individualSales
        mS.innerHTML = monthlySales
        aS.innerHTML = monthlySales*12
        totalSales.innerHTML = individualSales + (monthlySales*12)
    }

    static expenses(exp) {
        console.log(exp)
        let monthlyExpenses = 0;
        let individualExpenses = 0;
        exp.forEach(expense => {
            if (expense['attributes']['frequency'] == "individual") {
                individualExpenses += expense['attributes']['cost']
            }
            else {
                monthlyExpenses += expense['attributes']['cost']
            }
        })
        const table = document.getElementById('totals')
        const iE = table.rows[1].cells[2];
        const mE = table.rows[2].cells[2];
        const aE = table.rows[3].cells[2];
        const totalExpenses = table.rows[4].cells[2];
        iE.innerHTML = individualExpenses
        mE.innerHTML = monthlyExpenses
        aE.innerHTML = monthlyExpenses*12
        totalExpenses.innerHTML = individualExpenses + (monthlyExpenses*12)
    }
}