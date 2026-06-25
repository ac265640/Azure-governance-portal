const db = require("../models");

const Resource = db.Resource;

exports.getRecommendations =
async (req, res) => {

    try {

        const resources =
            await Resource.findAll();

        const recommendations = [];

        const today =
            new Date();

        for (const resource of resources) {

            if (
                !resource.lastActivityDate
            ) {
                continue;
            }

            const lastActivity =
                new Date(
                    resource.lastActivityDate
                );

            const daysInactive =
                Math.floor(
                    (
                        today -
                        lastActivity
                    ) /
                    (1000 * 60 * 60 * 24)
                );

            let recommendation =
                "Keep";

            let priority =
                "Low";

            if (
                daysInactive >= 180
            ) {

                recommendation =
                    "Reclaim";

                priority =
                    "High";

            }
            else if (
                daysInactive >= 90
            ) {

                recommendation =
                    "Review";

                priority =
                    "Medium";

            }

            recommendations.push({

                resourceId:
                    resource.id,

                resourceName:
                    resource.name,

                resourceType:
                    resource.type,

                daysInactive,

                status:
                    resource.status,

                recommendation,

                priority

            });

        }

        res.status(200).json({
            count:
                recommendations.length,

            recommendations
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};

exports.createReclamationRequest =
async (req, res) => {

    try {

        const resource =
            await db.Resource.findByPk(
                req.params.id
            );

        if (!resource) {
            return res.status(404).json({
                message:
                    "Resource not found"
            });
        }

        const existingRequest =
            await db.ReclamationRequest.findOne({
                where: {
                    resourceId:
                        resource.id,
                    status:
                        "Pending"
                }
            });

        if (existingRequest) {
            return res.status(400).json({
                message:
                    "Pending request already exists"
            });
        }

        const request =
            await db.ReclamationRequest.create({

                resourceId:
                    resource.id,

                status:
                    "Pending",

                remarks:
                    "Generated from recommendation engine"

            });

        await db.AuditLog.create({

            action:
                "Generated Reclamation Request",

            entityType:
                "ReclamationRequest",

            entityId:
                request.id,

            performedBy:
                "System"

        });

        res.status(201).json({

            message:
                "Reclamation request created",

            request

        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};