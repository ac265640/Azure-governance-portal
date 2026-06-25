const express = require("express");

const router = express.Router();

const recommendationController =
    require(
        "../controllers/recommendationController"
    );

const authenticateUser =
    require(
        "../middleware/authMiddleware"
    );

router.get(
    "/",
    authenticateUser,
    recommendationController.getRecommendations
);

router.post(
    "/:id/create-request",
    authenticateUser,
    recommendationController
        .createReclamationRequest
);

module.exports = router;