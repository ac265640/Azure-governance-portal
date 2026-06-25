const db = require("../models");
const { Op } = require("sequelize");

const Employee = db.Employee;
const Resource = db.Resource;
const AuditLog = db.AuditLog;

/*
|--------------------------------------------------------------------------
| Get All Employees
|--------------------------------------------------------------------------
*/

exports.getAllEmployees = async (req, res) => {
    try {

        const whereClause = {};

        if (req.query.search) {

            whereClause.name = {
                [Op.like]:
                    `%${req.query.search}%`
            };

        }

        const employees =
            await Employee.findAll({
                where: whereClause
            });

        res.status(200).json(employees);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Get Employee By ID
|--------------------------------------------------------------------------
*/

exports.getEmployeeById = async (req, res) => {
    try {

        const employee =
            await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json(employee);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Create Employee
|--------------------------------------------------------------------------
*/

exports.createEmployee = async (req, res) => {
    try {

        const employee =
            await Employee.create(req.body);

        await AuditLog.create({
            action: "Created Employee",
            entityType: "Employee",
            entityId: employee.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(201).json(employee);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Update Employee
|--------------------------------------------------------------------------
*/

exports.updateEmployee = async (req, res) => {
    try {

        const employee =
            await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        await employee.update(req.body);

        await AuditLog.create({
            action: "Updated Employee",
            entityType: "Employee",
            entityId: employee.id,
            performedBy:
                req.user?.email || "System"
        });

        res.status(200).json(employee);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

/*
|--------------------------------------------------------------------------
| Delete Employee
|--------------------------------------------------------------------------
*/

exports.deleteEmployee = async (req, res) => {
    try {

        const employee =
            await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        await AuditLog.create({
            action: "Deleted Employee",
            entityType: "Employee",
            entityId: employee.id,
            performedBy:
                req.user?.email || "System"
        });

        await employee.destroy();

        res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getEmployeeResources = async (req, res) => {
    try {

        const employee =
            await Employee.findByPk(
                req.params.id
            );

        if (!employee) {
            return res.status(404).json({
                message:
                    "Employee not found"
            });
        }

        const resources =
            await Resource.findAll({
                where: {
                    ownerEmployeeId:
                        employee.id
                }
            });

        res.status(200).json({
            employee,
            resourceCount:
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