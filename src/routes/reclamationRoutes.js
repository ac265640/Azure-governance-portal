const express = require("express");

const router = express.Router();

const reclamationController =
    require("../controllers/reclamationController");

const authenticateUser =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/roleMiddleware");

router.get(
    "/",
    reclamationController.getAllRequests
);

router.post(
    "/",
    reclamationController.createRequest
);

router.put(
    "/:id/approve",
    authenticateUser,
    authorizeRoles(
        "Admin",
        "Manager"
    ),
    reclamationController.approveRequest
);

router.put(
    "/:id/reject",
    authenticateUser,
    authorizeRoles(
        "Admin",
        "Manager"
    ),
    reclamationController.rejectRequest
);

router.get(
    "/:id",
    reclamationController.getRequestById
);

router.put(
    "/:id",
    reclamationController.updateRequest
);

router.delete(
    "/:id",
    reclamationController.deleteRequest
);

module.exports = router;