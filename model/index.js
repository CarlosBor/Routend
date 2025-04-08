const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Load models
const Member = require('./Member')(sequelize);
const Route = require('./Route')(sequelize);
const Trip = require('./Trip')(sequelize);
const MemberTrip = require('./MemberTrip')(sequelize);
const Photo = require('./Photo')(sequelize);
const Review = require('./Review')(sequelize);

// Associations
Member.belongsToMany(Trip, { through: MemberTrip, foreignKey: 'Member_idMember' });
Trip.belongsToMany(Member, { through: MemberTrip, foreignKey: 'Trip_idTrip' });

Trip.belongsTo(Route, { foreignKey: 'idRoute' });

Photo.belongsTo(Member, { foreignKey: 'idAuthor' });
Photo.belongsTo(Trip, { foreignKey: 'idTrip' });

Review.belongsTo(Member, { foreignKey: 'idAuthor' });
Review.belongsTo(Trip, { foreignKey: 'idTrip' });

module.exports = {
  sequelize,
  Member,
  Route,
  Trip,
  MemberTrip,
  Photo,
  Review
};
