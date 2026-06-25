const db = require("../models");
const { Op } = require("sequelize");

const ResourceGroup = db.ResourceGroup;
const Subscription = db.Subscription;
const AuditLog = db.AuditLog;

exports.getAllResourceGroups = async (req, res) => {
    try {

        const whereClause = {};

        if (req.query.search) {

            whereClause.name = {
                [Op.like]:
                    `%${req.query.search}%`
            };

        }

        const resourceGroups =
            await ResourceGroup.findAll({
                where: whereClause,
                include: [Subscription]
            });

        res.status(200).json(resourceGroups);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getResourceGroupById = async (req, res) => {
    try {

        const resourceGroup =
            await ResourceGroup.findByPk(
                req.params.id,
                {
                    include: [Subscription]
                }
            );

        if (!resourceGroup) {
            return res.status(404).json({
                message: "Resource Group not found"
            });
        }

        res.status(200).json(resourceGroup);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.createResourceGroup = async (req, res) => {
    try {

        const resourceGroup =
            await ResourceGroup.create(req.body);

        await AuditLog.create({
            action: "Created Resource Group",
            entityType: "ResourceGroup",
            entityId: resourceGroup.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(201).json(resourceGroup);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.updateResourceGroup = async (req, res) => {
    try {

        const resourceGroup =
            await ResourceGroup.findByPk(
                req.params.id
            );

        if (!resourceGroup) {
            return res.status(404).json({
                message: "Resource Group not found"
            });
        }

        await resourceGroup.update(req.body);

        await AuditLog.create({
            action: "Updated Resource Group",
            entityType: "ResourceGroup",
            entityId: resourceGroup.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(200).json(resourceGroup);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.deleteResourceGroup = async (req, res) => {
    try {

        const resourceGroup =
            await ResourceGroup.findByPk(
                req.params.id
            );

        if (!resourceGroup) {
            return res.status(404).json({
                message: "Resource Group not found"
            });
        }

        await AuditLog.create({
            action: "Deleted Resource Group",
            entityType: "ResourceGroup",
            entityId: resourceGroup.id,
            performedBy:
                req.user?.email || "System"
        });

        await resourceGroup.destroy();

        res.status(200).json({
            message:
                "Resource Group deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};