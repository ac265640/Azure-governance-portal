const db = require("../models");

exports.getDashboardStats = async (req, res) => {
    try {

        const totalUsers =
            await db.User.count();

        const totalEmployees =
            await db.Employee.count();

        const totalResources =
            await db.Resource.count();

        const totalResourceGroups =
            await db.ResourceGroup.count();

        const totalSubscriptions =
            await db.Subscription.count();

        const pendingRequests =
            await db.ReclamationRequest.count({
                where: {
                    status: "Pending"
                }
            });

        const approvedRequests =
            await db.ReclamationRequest.count({
                where: {
                    status: "Approved"
                }
            });

        const rejectedRequests =
            await db.ReclamationRequest.count({
                where: {
                    status: "Rejected"
                }
            });

        res.status(200).json({
            totalUsers,
            totalEmployees,
            totalResources,
            totalResourceGroups,
            totalSubscriptions,
            pendingRequests,
            approvedRequests,
            rejectedRequests
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getDashboardCharts = async (req, res) => {
    try {

        const activeResources =
            await db.Resource.count({
                where: {
                    status: "Active"
                }
            });

        const idleResources =
            await db.Resource.count({
                where: {
                    status: "Idle"
                }
            });

        const candidateResources =
            await db.Resource.count({
                where: {
                    status: "Candidate"
                }
            });

        const reclaimedResources =
            await db.Resource.count({
                where: {
                    status: "Reclaimed"
                }
            });

        const pendingRequests =
            await db.ReclamationRequest.count({
                where: {
                    status: "Pending"
                }
            });

        const approvedRequests =
            await db.ReclamationRequest.count({
                where: {
                    status: "Approved"
                }
            });

        const rejectedRequests =
            await db.ReclamationRequest.count({
                where: {
                    status: "Rejected"
                }
            });

        const vmCount =
            await db.Resource.count({
                where: {
                    type: "VM"
                }
            });

        const storageCount =
            await db.Resource.count({
                where: {
                    type: "Storage"
                }
            });

        const sqlCount =
            await db.Resource.count({
                where: {
                    type: "SQLDatabase"
                }
            });

        const appServiceCount =
            await db.Resource.count({
                where: {
                    type: "AppService"
                }
            });

        res.status(200).json({

            resourceStatus: {
                Active: activeResources,
                Idle: idleResources,
                Candidate: candidateResources,
                Reclaimed: reclaimedResources
            },

            reclamationStatus: {
                Pending: pendingRequests,
                Approved: approvedRequests,
                Rejected: rejectedRequests
            },

            resourceTypes: {
                VM: vmCount,
                Storage: storageCount,
                SQLDatabase: sqlCount,
                AppService: appServiceCount
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};