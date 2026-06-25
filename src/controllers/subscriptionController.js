const db = require("../models");
const { Op } = require("sequelize");

const Subscription = db.Subscription;
const AuditLog = db.AuditLog;

/*
|--------------------------------------------------------------------------
| Get All Subscriptions
|--------------------------------------------------------------------------
*/

exports.getAllSubscriptions = async (req, res) => {
    try {

        const whereClause = {};

        if (req.query.search) {

            whereClause.name = {
                [Op.like]:
                    `%${req.query.search}%`
            };

        }

        const subscriptions =
            await Subscription.findAll({
                where: whereClause
            });

        res.status(200).json(subscriptions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Get Subscription By ID
|--------------------------------------------------------------------------
*/

exports.getSubscriptionById = async (req, res) => {
    try {

        const subscription =
            await Subscription.findByPk(req.params.id);

        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found"
            });
        }

        res.status(200).json(subscription);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Create Subscription
|--------------------------------------------------------------------------
*/

exports.createSubscription = async (req, res) => {
    try {

        const subscription =
            await Subscription.create(req.body);

        await AuditLog.create({
            action: "Created Subscription",
            entityType: "Subscription",
            entityId: subscription.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(201).json(subscription);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Update Subscription
|--------------------------------------------------------------------------
*/

exports.updateSubscription = async (req, res) => {
    try {

        const subscription =
            await Subscription.findByPk(req.params.id);

        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found"
            });
        }

        await subscription.update(req.body);

        await AuditLog.create({
            action: "Updated Subscription",
            entityType: "Subscription",
            entityId: subscription.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(200).json(subscription);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Delete Subscription
|--------------------------------------------------------------------------
*/

exports.deleteSubscription = async (req, res) => {
    try {

        const subscription =
            await Subscription.findByPk(req.params.id);

        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found"
            });
        }

        await AuditLog.create({
            action: "Deleted Subscription",
            entityType: "Subscription",
            entityId: subscription.id,
            performedBy:
                req.user?.email || "System"
        });

        await subscription.destroy();

        res.status(200).json({
            message: "Subscription deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};