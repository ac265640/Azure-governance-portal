const db = require("../models");

const AuditLog = db.AuditLog;

exports.getAllLogs = async (req, res) => {
    try {

        const logs =
            await AuditLog.findAll({
                order: [["createdAt", "DESC"]]
            });

        res.status(200).json(logs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getLogById = async (req, res) => {
    try {

        const log =
            await AuditLog.findByPk(
                req.params.id
            );

        if (!log) {
            return res.status(404).json({
                message: "Log not found"
            });
        }

        res.status(200).json(log);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getLogsByEntity =
async (req, res) => {

    try {

        const logs =
            await AuditLog.findAll({
                where: {
                    entityType:
                        req.params.type,
                    entityId:
                        req.params.id
                },
                order: [
                    ["createdAt", "DESC"]
                ]
            });

        res.status(200).json({
            count:
                logs.length,
            logs
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};