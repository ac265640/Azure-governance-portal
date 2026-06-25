const db = require("../models");

const ReclamationRequest =
    db.ReclamationRequest;

const Resource =
    db.Resource;

const AuditLog =
    db.AuditLog;

/*
|--------------------------------------------------------------------------
| Get All Requests
|--------------------------------------------------------------------------
*/

exports.getAllRequests = async (req, res) => {
    try {

        const requests =
            await ReclamationRequest.findAll({
                include: [Resource]
            });

        res.status(200).json(requests);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Get Request By ID
|--------------------------------------------------------------------------
*/

exports.getRequestById = async (req, res) => {
    try {

        const request =
            await ReclamationRequest.findByPk(
                req.params.id,
                {
                    include: [Resource]
                }
            );

        if (!request) {
            return res.status(404).json({
                message:
                    "Request not found"
            });
        }

        res.status(200).json(request);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Create Request
|--------------------------------------------------------------------------
*/

exports.createRequest = async (req, res) => {
    try {

        const request =
            await ReclamationRequest.create(
                req.body
            );

        await AuditLog.create({
            action:
                "Created Reclamation Request",
            entityType:
                "ReclamationRequest",
            entityId:
                request.id,
            performedBy:
                "System"
        });

        res.status(201).json(request);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Update Request
|--------------------------------------------------------------------------
*/

exports.updateRequest = async (req, res) => {
    try {

        const request =
            await ReclamationRequest.findByPk(
                req.params.id
            );

        if (!request) {
            return res.status(404).json({
                message:
                    "Request not found"
            });
        }

        await request.update(req.body);

        /*
        |--------------------------------------------------------------------------
        | If Approved → Reclaim Resource
        |--------------------------------------------------------------------------
        */

        if (
            request.status ===
            "Approved"
        ) {

            const resource =
                await Resource.findByPk(
                    request.resourceId
                );

            if (resource) {

                await resource.update({
                    status:
                        "Reclaimed"
                });

            }
        }

        await AuditLog.create({
            action:
                "Updated Reclamation Request",
            entityType:
                "ReclamationRequest",
            entityId:
                request.id,
            performedBy:
                "System"
        });

        res.status(200).json(request);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Delete Request
|--------------------------------------------------------------------------
*/

exports.deleteRequest = async (req, res) => {
    try {

        const request =
            await ReclamationRequest.findByPk(
                req.params.id
            );

        if (!request) {
            return res.status(404).json({
                message:
                    "Request not found"
            });
        }

        await request.destroy();

        res.status(200).json({
            message:
                "Request deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.approveRequest = async (req, res) => {
    try {

        const request =
            await ReclamationRequest.findByPk(
                req.params.id
            );

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        request.status = "Approved";

        await request.save();

        res.status(200).json({
            message:
                "Request approved successfully",
            request
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.rejectRequest = async (req, res) => {
    try {

        const request =
            await ReclamationRequest.findByPk(
                req.params.id
            );

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        request.status = "Rejected";

        await request.save();

        res.status(200).json({
            message:
                "Request rejected successfully",
            request
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};