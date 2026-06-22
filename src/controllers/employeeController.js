const db = require("../models");

const Employee = db.Employee;

/*
|--------------------------------------------------------------------------
| Get All Employees
|--------------------------------------------------------------------------
*/

exports.getAllEmployees = async (req, res) => {
    try {

        const employees =
            await Employee.findAll();

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