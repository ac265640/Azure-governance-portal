const bcrypt = require("bcryptjs");

const db =
    require("./src/models");

async function seed() {

    await db.sequelize.sync();

    const adminPassword =
        await bcrypt.hash(
            "admin123",
            10
        );

    const managerPassword =
        await bcrypt.hash(
            "manager123",
            10
        );

    await db.User.bulkCreate([

        {
            name: "Admin",
            email:
                "admin@test.com",
            password:
                adminPassword,
            role: "Admin"
        },

        {
            name: "Manager",
            email:
                "manager@test.com",
            password:
                managerPassword,
            role: "Manager"
        }

    ]);

    await db.Employee.bulkCreate([

        {
            employeeId:
                "EMP001",
            name:
                "John Doe",
            email:
                "john@test.com",
            department:
                "Cloud",
            designation:
                "Engineer"
        },

        {
            employeeId:
                "EMP002",
            name:
                "Jane Doe",
            email:
                "jane@test.com",
            department:
                "Operations",
            designation:
                "Analyst"
        }

    ]);

    await db.ResourceGroup.bulkCreate([

        {
            name:
                "Production-RG",
            location:
                "Central India"
        },

        {
            name:
                "Development-RG",
            location:
                "East US"
        }

    ]);

    await db.Subscription.bulkCreate([

        {
            name:
                "Student Subscription",
            subscriptionId:
                "SUB001"
        }

    ]);

    await db.Resource.bulkCreate([

        {
            name:
                "Production VM",

            type:
                "VM",

            location:
                "Central India",

            lastActivityDate:
                "2025-01-01"
        },

        {
            name:
                "Storage Account",

            type:
                "Storage",

            location:
                "East US",

            lastActivityDate:
                "2026-01-01"
        }

    ]);

    console.log(
        "Seed completed"
    );

    process.exit();
}

seed();