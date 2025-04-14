/*
Table: Member
Columns:
idMember int AI PK 
name varchar(45) 
email varchar(45) 
password varchar(256) 
isAdmin tinyint UN 
firstAid tinyint UN

FK:-
*/

import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";
import Photos from "./photos.js";
import Reviews from "./reviews.js";

const Member = connection.define("Member",{
    idMember: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(256),
        allownull: false,
    },
    isAdmin: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
    },
    firstAid: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    }
    
})

Member.hasMany(Photos,{foreignKey:"idAuthor", onDelete:"CASCADE"}); // Si se borra un miembro se borran todas sus fotos
Member.hasMany(Reviews,{foreignKey:"idAuthor", onDelete:"SET NULL"}); // Si se borra un miembro se guardan sus reseñas pero ya no se le identifica
Photos.belongsTo(Member,{foreignKey:"idAuthor"});
Reviews.belongsTo(Member,{foreignKey:"idAuthor",targetKey:"idMember"});

export default Member;