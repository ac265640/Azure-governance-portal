const express = require("express");
const cors = require("cors");

const userRoutes =
    require("./src/routes/userRoutes");

const authRoutes =
    require("./src/routes/authRoutes");

const employeeRoutes =
    require("./src/routes/employeeRoutes");

const resourceRoutes =
    require("./src/routes/resourceRoutes");

const subscriptionRoutes =
    require("./src/routes/subscriptionRoutes");

const resourceGroupRoutes =
    require("./src/routes/resourceGroupRoutes");

const reclamationRoutes =
    require("./src/routes/reclamationRoutes");

const dashboardRoutes =
    require("./src/routes/dashboardRoutes");

const auditLogRoutes =
    require("./src/routes/auditLogRoutes");

const recommendationRoutes =
    require(
        "./src/routes/recommendationRoutes"
    );

const healthRoutes =
    require("./src/routes/healthRoutes");

const versionRoutes =
    require("./src/routes/versionRoutes");

const docsRoutes =
    require("./src/routes/docsRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.json({
        message:
            "Azure Governance Portal API Running"
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/resources", resourceRoutes);

app.use("/api/subscriptions", subscriptionRoutes);

app.use("/api/resourcegroups", resourceGroupRoutes);

app.use("/api/reclamations", reclamationRoutes);

app.use(
    "/api/dashboard",
    dashboardRoutes
);

app.use(
    "/api/auditlogs",
    auditLogRoutes
);

app.use(
    "/api/recommendations",
    recommendationRoutes
);

app.use(
    "/api/health",
    healthRoutes
);

app.use(
    "/api/version",
    versionRoutes
);

app.use(
    "/api/docs",
    docsRoutes
);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;