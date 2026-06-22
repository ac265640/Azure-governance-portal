const db = require("../models");

const Resource = db.Resource;
const Employee = db.Employee;
const ResourceGroup = db.ResourceGroup;

/*
|--------------------------------------------------------------------------
| Get All Resources
|--------------------------------------------------------------------------
*/

exports.getAllResources = async (req, res) => {
    try {

        const count = await Resource.count();

        console.log("Resource Count:", count);

        const resources = await Resource.findAll();

        res.status(200).json({
            count,
            resources
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
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