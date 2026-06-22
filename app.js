const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./src/routes/employeeRoutes");
const resourceRoutes = require("./src/routes/resourceRoutes");
const subscriptionRoutes = require("./src/routes/subscriptionRoutes");

const app = express();

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Azure Governance Portal Backend Running"
    });
});

/*
|--------------------------------------------------------------------------
| Employee Routes
|--------------------------------------------------------------------------
*/

app.use(
    "/api/employees",
    employeeRoutes
);

/*
|--------------------------------------------------------------------------
| Resource Routes
|--------------------------------------------------------------------------
*/

app.use(
    "/api/resources",
    resourceRoutes
);

/*
|--------------------------------------------------------------------------
| Subscription Routes
|--------------------------------------------------------------------------
*/

app.use(
    "/api/subscriptions",
    subscriptionRoutes
);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

/*
|--------------------------------------------------------------------------
| Export App
|--------------------------------------------------------------------------
*/

module.exports = app;