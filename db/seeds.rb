# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Calculator.create(name: "Test")
#Calculator.create(name: "Test2")
#Product.create(name: "U'SPINN T-shirt", cost: 15, frequency: "monthly")
#Product.create(name: "Thick-fil-a Crop", cost: 10, frequency: "individual")
Expense.create(name: "software", cost: 10, frequency: "monthly", calculator_id: 44)
Expense.create(name: "hardware", cost: 100, frequency: "individual", calculator_id: 44)