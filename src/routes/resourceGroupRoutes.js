const express = require("express");

const router = express.Router();

const resourceGroupController =
    require("../controllers/resourceGroupController");

router.get(
    "/",
    resourceGroupController.getAllResourceGroups
);

router.get(
    "/:id",
    resourceGroupController.getResourceGroupById
);

router.post(
    "/",
    resourceGroupController.createResourceGroup
);

router.put(
    "/:id",
    resourceGroupController.updateResourceGroup
);

router.delete(
    "/:id",
    resourceGroupController.deleteResourceGroup
);

module.exports = router;