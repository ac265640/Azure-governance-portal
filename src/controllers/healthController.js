const db = require("../models");

exports.getHealth = async (req, res) => {

    try {

        await db.sequelize.authenticate();

        res.status(200).json({

            status: "Healthy",

            database: "Connected",

            timestamp:
                new Date().toISOString()

        });

    } catch (error) {

        res.status(500).json({

            status: "Unhealthy",

            database: "Disconnected",

            error:
                error.message

        });

    }

};