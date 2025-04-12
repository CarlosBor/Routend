/*Table: Trip
Columns:
idTrip int AI PK 
Time date 
idGuide int 
idRoute int 
weather enum('Cloudy','Sunny',
'Rainy','Windy',
'Snowy','Unknown')
*/

import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";
import Review from "./reviews.js";
import Photos from "./photos.js";

const Trip = connection.define("Trip",{
    idTrip: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    meetingPoint: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    idGuide: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    idRoute: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    }, 
    weather: {
        type: DataTypes.ENUM("Cloudy", "Sunny", "Rainy", "Windy", "Snowy", "Unknown"),
        allowNull: false,
    }
});

Trip.hasMany(Review,{foreignKey:"idTrip", onDelete: "CASCADE"}); //Borrar las reviews de un viaje si se borra el viaje
Review.belongsTo(Trip,{foreignKey:"idTrip"});
Trip.hasMany(Photos,{foreignKey:"idTrip", onDelete: "CASCADE"}); //Borrar las fotos de un viaje si se borra el viaje
Photos.belongsTo(Trip,{foreignKey:"idTrip"});

export default Trip;