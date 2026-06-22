const db = require("../models");

async function seedDatabase() {

    const employeeCount =
        await db.Employee.count();

    if (employeeCount > 0) {
        console.log("Seed data already exists");
        return;
    }

    console.log("Creating seed data...");

    const employee1 =
        await db.Employee.create({
            employeeId: "EMP001",
            name: "Anubhav",
            email: "anubhav@example.com",
            department: "Cloud",
            designation: "Cloud Engineer"
        });

    const employee2 =
        await db.Employee.create({
            employeeId: "EMP002",
            name: "Rahul",
            email: "rahul@example.com",
            department: "DevOps",
            designation: "DevOps Engineer"
        });

    const subscription =
        await db.Subscription.create({
            name: "Azure Student",
            azureSubscriptionId: "SUB001",
            owner: "Admin"
        });

    const resourceGroup =
        await db.ResourceGroup.create({
            name: "Development-RG",
            location: "Central India",
            subscriptionId: subscription.id
        });

    console.log("Creating VM...");

    await db.Resource.create({
        name: "DemoVM",
        type: "VM",
        location: "Central India",
        status: "Active",
        resourceGroupId: resourceGroup.id,
        ownerEmployeeId: employee1.id
    });
    console.log("VM Created");

    console.log("Seed data created");
}

module.exports = seedDatabase;