const express = require("express");

const router = express.Router();

const authenticateUser =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/roleMiddleware");
    
const resourceController =
    require("../controllers/resourceController");

router.get(
    "/",
    resourceController.getAllResources
);

router.get(
    "/:id",
    resourceController.getResourceById
);

router.post(
    "/",
    authenticateUser,
    authorizeRoles(
        "Admin",
        "Manager"
    ),
    resourceController.createResource
);

router.put(
    "/:id",
    authenticateUser,
    authorizeRoles(
        "Admin",
        "Manager"
    ),
    resourceController.updateResource
);

router.delete(
    "/:id",
    authenticateUser,
    authorizeRoles(
        "Admin",
        "Manager"
    ),
    resourceController.deleteResource
);

router.put(
    "/:id/assign",
    authenticateUser,
    authorizeRoles(
        "Admin",
        "Manager"
    ),
    resourceController.assignResource
);

router.put(
    "/:id/unassign",
    authenticateUser,
    authorizeRoles(
        "Admin",
        "Manager"
    ),
    resourceController.unassignResource
);

router.put(
    "/:id/analyze",
    authenticateUser,
    authorizeRoles(
        "Admin",
        "Manager"
    ),
    resourceController.analyzeResource
);

module.exports = router;