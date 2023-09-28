const Users = require("./usersM");
const Properties = require("./propertiesM");
const Favorites = require("./favoritesM");
const Appointments = require("./appointmentsM");
const Reviews = require("./reviewsM");

Users.hasMany(Favorites, { foreignKey: "uid" });
Properties.hasMany(Favorites, { foreignKey: "pid" });

Favorites.belongsTo(Users, { foreignKey: "uid" });
Favorites.belongsTo(Properties, { foreignKey: "pid" });

Users.hasMany(Appointments, { foreignKey: "uid" });
Properties.hasMany(Appointments, { foreignKey: "pid" });

Appointments.belongsTo(Users, { foreignKey: "uid" });
Appointments.belongsTo(Properties, { foreignKey: "pid" });

Users.hasMany(Reviews, { foreignKey: "uid" });
Properties.hasMany(Reviews, { foreignKey: "pid" });

Reviews.belongsTo(Users, { foreignKey: "uid" });
Reviews.belongsTo(Properties, { foreignKey: "pid" });

module.exports = { Users, Properties, Appointments, Reviews, Favorites };
