const db = require("../models");

const Subscription = db.Subscription;

/*
|--------------------------------------------------------------------------
| Get All Subscriptions
|--------------------------------------------------------------------------
*/

exports.getAllSubscriptions = async (req, res) => {
    try {

        const subscriptions =
            await Subscription.findAll();

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