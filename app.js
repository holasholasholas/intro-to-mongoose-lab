const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.set("debug", true);
const Customer = require("./models/Customer.js");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Call connect before starting the application
connect();

const validSelections = ["1", "2", "3", "4", "5"];
const prompt = require("prompt-sync")();

// Define viewCustomers function
const viewCustomers = async () => {
  try {
    const customers = await Customer.find({});
    console.log("\nAll Customers:");
    customers.forEach(customer => {
      console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`);
    });
    return customers;
  } catch (error) {
    console.error("Error viewing customers:", error);
  }
};

const main = async () => {
  try{
    while (true) {
      const menuSelection = prompt(`
      Welcome to the CRM
  
    What would you like to do?
  
      1. Create a customer
      2. View all customers
      3. Update a customer
      4. Delete a customer
      5. Quit
  
    Number of action to run:`);
  
      if (!validSelections.includes(menuSelection)) {
        console.log("Invalid selection, try again!");
        continue;
      }
      console.log(`You have chosen ${menuSelection}`);
  
      try {
        switch (menuSelection) {
          case "1":
            const enterName = prompt("Enter Name: ");
            const enterAge = prompt("Enter age: ");
  
            const newCustomerDetails = {
              name: enterName,
              age: enterAge,
            };
            const customerCreated = await Customer.create(newCustomerDetails);
            console.log("New Customer:", customerCreated);
            break;
  
          case "2":
            await viewCustomers();
            break;
  
          case "3":
            await viewCustomers();
            const updateId = prompt("Enter the ID of the customer to update: ");
            const updateName = prompt("Enter new name (leave blank to keep current): ");
            const updateAge = prompt("Enter new age (leave blank to keep current): ");
            
            const updateData = {};
            if (updateName) updateData.name = updateName;
            if (updateAge) updateData.age = updateAge;
            
            const updatedCustomer = await Customer.findByIdAndUpdate(
              updateId,
              updateData,
              { new: true } // This returns the updated document
            );
            
            if (updatedCustomer) {
              console.log("Customer updated successfully:", updatedCustomer);
            } else {
              console.log("Customer not found");
            }
            break;
  
          case "4":
            await viewCustomers();
            const deleteId = prompt(
              "Input the ID of the customer you would like to delete: "
            );
            const deletedCustomer = await Customer.findByIdAndDelete(deleteId);
            
            if (deletedCustomer) {
              console.log("Customer deleted successfully.");
            } else {
              console.log("Customer not found");
            }
            break;
  
          case "5":
            console.log("Exiting...");
            await mongoose.connection.close();
            process.exit(0);
        }
      } catch (error) {
        console.error("Error:", error);
      }
  }
}catch (error) {
  console.error("Application error:", error);
  await mongoose.connection.close();
  process.exit(1);
};
};

main();

