const sequelize = require("../database/database");

const User = require("./user");
const Employee = require("./employee");
const Subscription = require("./subscription");
const ResourceGroup = require("./ResourceGroup");
const Resource = require("./resource");
const ReclamationRequest = require("./ReclamationRequest");
const AuditLog = require("./AuditLog");

/*
|--------------------------------------------------------------------------
| Subscription ↔ ResourceGroup
|--------------------------------------------------------------------------
*/

Subscription.hasMany(ResourceGroup, {
    foreignKey: "subscriptionId",
    onDelete: "CASCADE"
});

ResourceGroup.belongsTo(Subscription, {
    foreignKey: "subscriptionId"
});

/*
|--------------------------------------------------------------------------
| ResourceGroup ↔ Resource
|--------------------------------------------------------------------------
*/

ResourceGroup.hasMany(Resource, {
    foreignKey: "resourceGroupId",
    onDelete: "CASCADE"
});

Resource.belongsTo(ResourceGroup, {
    foreignKey: "resourceGroupId"
});

/*
|--------------------------------------------------------------------------
| Employee ↔ Resource
|--------------------------------------------------------------------------
*/

Employee.hasMany(Resource, {
    foreignKey: "ownerEmployeeId"
});

Resource.belongsTo(Employee, {
    foreignKey: "ownerEmployeeId"
});

/*
|--------------------------------------------------------------------------
| Resource ↔ ReclamationRequest
|--------------------------------------------------------------------------
*/

Resource.hasMany(ReclamationRequest, {
    foreignKey: "resourceId",
    onDelete: "CASCADE"
});

ReclamationRequest.belongsTo(Resource, {
    foreignKey: "resourceId"
});

/*
|--------------------------------------------------------------------------
| Export Models
|--------------------------------------------------------------------------
*/

const db = {
    sequelize,
    User,
    Employee,
    Subscription,
    ResourceGroup,
    Resource,
    ReclamationRequest,
    AuditLog,
};

module.exports = db;