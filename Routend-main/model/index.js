import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

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

import defineMember from './Member.js';
import defineRoute from './Route.js';
import definePhoto from './Photo.js';
import defineReview from './Review.js';
import defineTrip from './Trip.js';
import defineMemberTrip from './MemberTrip.js';


const Member = defineMember(sequelize);
const Route = defineRoute(sequelize);
const Photo = definePhoto(sequelize);
const Review = defineReview(sequelize);
const Trip = defineTrip(sequelize);
const MemberTrip = defineMemberTrip(sequelize);

Member.belongsToMany(Trip, { through: MemberTrip, foreignKey: 'Member_idMember' });
Trip.belongsToMany(Member, { through: MemberTrip, foreignKey: 'Trip_idTrip' });

Trip.belongsTo(Route, { foreignKey: 'idRoute' });

Photo.belongsTo(Member, { foreignKey: 'idAuthor' });
Photo.belongsTo(Trip, { foreignKey: 'idTrip' });

Review.belongsTo(Member, { foreignKey: 'idAuthor' });
Review.belongsTo(Trip, { foreignKey: 'idTrip' });

MemberTrip.belongsTo(Trip, { foreignKey: 'Trip_idTrip', onDelete: 'CASCADE' });
Photo.belongsTo(Trip, { foreignKey: 'idTrip', onDelete: 'CASCADE' });

Review.belongsTo(Trip, {
  foreignKey: 'idTrip',
  onDelete: 'CASCADE', // Ensures that when a Trip is deleted, related Reviews are also deleted
});
Trip.hasMany(MemberTrip, {
  foreignKey: 'Trip_idTrip',
  onDelete: 'CASCADE', // Ensures related MemberTrip rows are deleted when the Trip is deleted
});
Trip.hasMany(Photo, {
  foreignKey: 'idTrip',
  onDelete: 'CASCADE', // Ensures related Photos are deleted when the Trip is deleted
});

Trip.hasMany(Review, {
  foreignKey: 'idTrip',
  onDelete: 'CASCADE', // Ensures related Reviews are deleted when the Trip is deleted
});

export { sequelize, Member, Route, Trip, MemberTrip, Photo, Review };
