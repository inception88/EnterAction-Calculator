class Total {


    static productTotals(prod) {
        let individualSales = 0;
        let monthlySales = 0;
        let individualCommission = 0;
        let monthlyCommission = 0;
        let individualRevenue = 0;
        let monthlyRevenue = 0;
        let monthlyExpenses = 0;
        let individualExpenses = 0;

        prod.forEach(product => {
            if (product['attributes']['frequency'] == "individual") {
                individualExpenses += product['attributes']['cost']*product['attributes']['sales']
                individualSales += product['attributes']['sales']
                individualCommission += (product['attributes']['sales'])*((product['attributes']['commission'])/100)*(Product.price(product))
                individualRevenue += (product['attributes']['sales'])*(Product.price(product))
            }
            else {
                monthlyExpenses += product['attributes']['cost']*product['attributes']['sales']
                monthlySales += product['attributes']['sales']
                monthlyCommission += (product['attributes']['sales'])*((product['attributes']['commission'])/100)*(Product.price(product))
                monthlyRevenue += (product['attributes']['sales'])*(Product.price(product))
            }
        })
        const table = document.getElementById('totals')
        table.rows[1].cells[1].innerHTML = individualSales;
        table.rows[2].cells[1].innerHTML = monthlySales
        table.rows[3].cells[1].innerHTML = monthlySales*12 //annual sales
        table.rows[4].cells[1].innerHTML = individualSales + (monthlySales*12) //total sales
        table.rows[1].cells[3].innerHTML = toDollar(individualCommission)
        table.rows[2].cells[3].innerHTML = toDollar(monthlyCommission)
        table.rows[3].cells[3].innerHTML = toDollar(monthlyCommission*12) //annual commision
        table.rows[4].cells[3].innerHTML = toDollar(individualCommission+(monthlyCommission*12)) //total commission
        table.rows[1].cells[4].innerHTML = toDollar(individualRevenue)
        table.rows[2].cells[4].innerHTML = toDollar(monthlyRevenue)
        table.rows[3].cells[4].innerHTML = toDollar(monthlyRevenue*12) //annual revenue
        table.rows[4].cells[4].innerHTML = toDollar(individualRevenue+(monthlyRevenue*12)) //total revenue
        individualProductExpenses = individualExpenses
        monthlyProductExpenses = monthlyExpenses
    }

    static expenseTotals(exp) {
        let monthlyExpenses = 0;
        let individualExpenses = 0;
        exp.forEach(expense => {
            if (expense['attributes']['frequency'] == "individual") {
                individualExpenses += expense['attributes']['cost']*expense['attributes']['quantity']
            }
            else {
                monthlyExpenses += expense['attributes']['cost']*expense['attributes']['quantity']
            }
        })
        const table = document.getElementById('totals')
        table.rows[1].cells[2].innerHTML = toDollar(individualExpenses + individualProductExpenses) //individual expenses + individual product costs
        table.rows[2].cells[2].innerHTML = toDollar(monthlyExpenses + monthlyProductExpenses) //monthly expenses + monthly product costs
        table.rows[3].cells[2].innerHTML = toDollar(monthlyExpenses + monthlyProductExpenses) //annual expenses + annual product costs
        //annual and individual expenses + annual and individual product costs
        table.rows[4].cells[2].innerHTML = toDollar(individualExpenses + individualProductExpenses + ((monthlyExpenses+monthlyProductExpenses)*12))
    }

    static delete(json) {

    }

    static update(json) {

    }

    static updateTotals(json) {
        this.productTotals(json)
        this.expenseTotals(json, )
    }
}