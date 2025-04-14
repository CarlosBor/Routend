const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Configuración de Sequelize (Usando SQLite para pruebas locales)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false, // Para evitar logs en consola
});

// Definición de Modelos
const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false }
});

const Perfil = sequelize.define('Perfil', {
    biografia: { type: DataTypes.STRING },
});

// Relación Uno a Uno (Fuerte - Clave primaria compartida)
Usuario.hasOne(Perfil, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Perfil.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Relación Uno a Uno (Débil - Clave foránea normal)
const Pasaporte = sequelize.define('Pasaporte', {
    numero: { type: DataTypes.STRING, unique: true }
});
Usuario.hasOne(Pasaporte, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Pasaporte.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Relación Uno a Muchos
const Post = sequelize.define('Post', {
    contenido: { type: DataTypes.STRING }
});
Usuario.hasMany(Post, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Post.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Relación Muchos a Muchos
const Curso = sequelize.define('Curso', {
    nombre: { type: DataTypes.STRING, allowNull: false }
});
const UsuarioCurso = sequelize.define('UsuarioCurso', {}); // Tabla intermedia
Usuario.belongsToMany(Curso, { through: UsuarioCurso });
Curso.belongsToMany(Usuario, { through: UsuarioCurso });

// Sincronización de la base de datos
(async () => {
    await sequelize.sync({ force: true });
    console.log("📌 Base de datos sincronizada");
})();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('API funcionando 🚀'));
app.listen(3000, () => console.log('🔥 Servidor corriendo en http://localhost:3000'));
