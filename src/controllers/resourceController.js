const db = require("../models");
const { Op } = require("sequelize");

const Resource = db.Resource;
const Employee = db.Employee;
const ResourceGroup = db.ResourceGroup;
const AuditLog = db.AuditLog;

/*
|--------------------------------------------------------------------------
| Get All Resources
|--------------------------------------------------------------------------
*/

exports.getAllResources = async (req, res) => {
    try {

        const whereClause = {};

        if (req.query.search) {

            whereClause.name = {
                [Op.like]:
                    `%${req.query.search}%`
            };

        }

        if (req.query.status) {
            whereClause.status =
                req.query.status;
        }

        if (req.query.type) {
            whereClause.type =
                req.query.type;
        }

        if (req.query.ownerEmployeeId) {
            whereClause.ownerEmployeeId =
                req.query.ownerEmployeeId;
        }

        if (req.query.resourceGroupId) {
            whereClause.resourceGroupId =
                req.query.resourceGroupId;
        }

        const resources =
            await Resource.findAll({
                where: whereClause
            });

        res.status(200).json({
            count:
                resources.length,
            resources
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Get Resource By ID
|--------------------------------------------------------------------------
*/

exports.getResourceById = async (req, res) => {
    try {

        const resource = await Resource.findByPk(
            req.params.id,
            {
                include: [
                    Employee,
                    ResourceGroup
                ]
            }
        );

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        res.status(200).json(resource);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Create Resource
|--------------------------------------------------------------------------
*/

exports.createResource = async (req, res) => {
    try {

        const resource =
            await Resource.create(req.body);

        await AuditLog.create({
            action: "Created Resource",
            entityType: "Resource",
            entityId: resource.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(201).json(resource);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Update Resource
|--------------------------------------------------------------------------
*/

exports.updateResource = async (req, res) => {
    try {

        const resource =
            await Resource.findByPk(req.params.id);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        await resource.update(req.body);

        await AuditLog.create({
            action: "Updated Resource",
            entityType: "Resource",
            entityId: resource.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(200).json(resource);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Delete Resource
|--------------------------------------------------------------------------
*/

exports.deleteResource = async (req, res) => {
    try {

        const resource =
            await Resource.findByPk(req.params.id);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        await AuditLog.create({
            action: "Deleted Resource",
            entityType: "Resource",
            entityId: resource.id,
            performedBy:
                req.user?.email || "System"
        });

        await resource.destroy();

        res.status(200).json({
            message: "Resource deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.assignResource = async (req, res) => {
    try {

        const resource =
            await Resource.findByPk(
                req.params.id
            );

        if (!resource) {
            return res.status(404).json({
                message:
                    "Resource not found"
            });
        }

        const employee =
            await Employee.findByPk(
                req.body.employeeId
            );

        if (!employee) {
            return res.status(404).json({
                message:
                    "Employee not found"
            });
        }

        resource.ownerEmployeeId =
            employee.id;

        await resource.save();

        await AuditLog.create({
            action: "Assigned Resource",
            entityType: "Resource",
            entityId: resource.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(200).json({
            message:
                "Resource assigned successfully",
            resource,
            employee
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.unassignResource = async (req, res) => {
    try {

        const resource =
            await Resource.findByPk(
                req.params.id
            );

        if (!resource) {
            return res.status(404).json({
                message:
                    "Resource not found"
            });
        }

        resource.ownerEmployeeId =
            null;

        await resource.save();

        await AuditLog.create({
            action: "Unassigned Resource",
            entityType: "Resource",
            entityId: resource.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(200).json({
            message:
                "Resource unassigned successfully",
            resource
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.analyzeResource = async (req, res) => {
    try {

        const resource =
            await Resource.findByPk(
                req.params.id
            );

        if (!resource) {
            return res.status(404).json({
                message:
                    "Resource not found"
            });
        }

        if (!resource.lastActivityDate) {
            return res.status(400).json({
                message:
                    "lastActivityDate not available"
            });
        }

        const today = new Date();

        const lastActivity =
            new Date(
                resource.lastActivityDate
            );

        const diffDays =
            Math.floor(
                (
                    today -
                    lastActivity
                ) /
                (1000 * 60 * 60 * 24)
            );

        let recommendation;

        if (diffDays >= 180) {

            resource.status =
                "Idle";

            recommendation =
                "Strong reclaim candidate";

        } else if (diffDays >= 90) {

            resource.status =
                "Candidate";

            recommendation =
                "Review for reclamation";

        } else {

            resource.status =
                "Active";

            recommendation =
                "Keep resource";

        }

        await resource.save();

        await AuditLog.create({
            action: "Analyzed Resource",
            entityType: "Resource",
            entityId: resource.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(200).json({

            resourceId:
                resource.id,

            daysInactive:
                diffDays,

            status:
                resource.status,

            recommendation

        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }
};