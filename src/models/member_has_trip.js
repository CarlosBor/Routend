/*Table: Member_has_Trip
Columns:
Member_idMember int PK 
Trip_idTrip int PK 
hasVehicle tinyint 
freeSeats int UN */



import { DataTypes } from "sequelize";        
import connection from "../config/sequelize.js";
import Trip from "./trip.js";
import Member from "./member.js";

const Member_has_Trip = connection.define("Member_has_Trip",{
    Member_idMember: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    Trip_idTrip: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    freeSeats: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0
    }
})

Trip.belongsToMany(Member,{through:"Member_has_Trip", foreignKey: "Trip_idTrip"});
Member.belongsToMany(Trip,{through:"Member_has_Trip", foreignKey: "Member_idMember"});

export default Member_has_Trip;