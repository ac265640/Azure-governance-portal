require("dotenv").config();

const app = require("./app");

const db = require("./src/models");

const seedDatabase =
    require("./src/services/seedService");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {

        await db.sequelize.authenticate();

        console.log("Database Connected Successfully");

        await db.sequelize.sync({
            alter: true
        });

        console.log("Database Synced Successfully");

        await seedDatabase();

        app.listen(PORT, () => {
            console.log(`
===================================
 Azure Governance Portal API
 Running on Port: ${PORT}
===================================
`);
        });

    } catch (error) {

        console.error(
            "Database Error:",
            error
        );

    }
}

startServer();