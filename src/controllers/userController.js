const db = require("../models");
const bcrypt = require("bcryptjs");

const User = db.User;
const AuditLog = db.AuditLog;

exports.getAllUsers = async (req, res) => {
    try {

        const users =
            await User.findAll();

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getUserById = async (req, res) => {
    try {

        const user =
            await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.createUser = async (req, res) => {
    try {

        const hashedPassword =
            await bcrypt.hash(
                req.body.password,
                10
            );

        const user =
            await User.create({
                ...req.body,
                password: hashedPassword
            });

        await AuditLog.create({
            action: "Created User",
            entityType: "User",
            entityId: user.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.updateUser = async (req, res) => {
    try {

        const user =
            await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.update(req.body);

        await AuditLog.create({
            action: "Updated User",
            entityType: "User",
            entityId: user.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.deleteUser = async (req, res) => {
    try {

        const user =
            await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await AuditLog.create({
            action: "Deleted User",
            entityType: "User",
            entityId: user.id,
            performedBy:
                req.user?.email || "System"
        });

        await user.destroy();

        res.status(200).json({
            message:
                "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};