const express = require("express");

const router = express.Router();

const auditLogController =
    require("../controllers/auditLogController");

const authenticateUser =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/roleMiddleware");

router.get(
    "/",
    authenticateUser,
    authorizeRoles("Admin"),
    auditLogController.getAllLogs
);

router.get(
    "/entity/:type/:id",
    authenticateUser,
    authorizeRoles(
        "Admin",
        "Manager"
    ),
    auditLogController.getLogsByEntity
);

router.get(
    "/:id",
    authenticateUser,
    authorizeRoles("Admin"),
    auditLogController.getLogById
);

module.exports = router;