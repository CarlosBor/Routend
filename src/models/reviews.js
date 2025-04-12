/*
Table: Reviews
Columns:
idReview int AI PK 
idAuthor int 
idTrip int 
review varchar(1000)*/

import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";


const Review = connection.define("Reviews",{
    idReview: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idAuthor: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    idTrip: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    review: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    }
});

export default Review;
