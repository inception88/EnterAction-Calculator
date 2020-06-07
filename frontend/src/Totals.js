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
}