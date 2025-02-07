const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.set("debug", true);
const Customer = require("./models/Customer.js");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await runQueries();
}


const prompt = require('prompt-sync')();

const menuSelection = prompt(`
  Welcome to the CRM

What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit

Number of action to run:`);

console.log(`You have choosen ${menuSelection}`);

switch (menuSelection) {
  case '1':

  const enterName = prompt("Enter Name!");
  const enterAge = prompt("Enter age!");
    
    const createCustomer = async () => {
      const newCustomerDetails = {
        name: enterName,
        age: enterAge
      };
      const customerCreated = await Customer.create(newCustomerDetails);
      console.log("New Customer:", customerCreated);
    };
    
    createCustomer();
    break;
    
  }
