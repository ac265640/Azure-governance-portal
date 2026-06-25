const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.status(200).json({

        project:
            "Azure Governance Portal",

        version:
            "1.0.0",

        endpoints: {

            auth:
                "/api/auth/login",

            users:
                "/api/users",

            employees:
                "/api/employees",

            resources:
                "/api/resources",

            resourceGroups:
                "/api/resourcegroups",

            subscriptions:
                "/api/subscriptions",

            reclamations:
                "/api/reclamations",

            recommendations:
                "/api/recommendations",

            dashboard:
                "/api/dashboard",

            auditLogs:
                "/api/auditlogs",

            health:
                "/api/health",

            version:
                "/api/version"

        }

    });

});

module.exports = router;