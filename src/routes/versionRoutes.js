const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        project:
            "Azure Governance Portal",

        version:
            "1.0.0"

    });

});

module.exports = router;