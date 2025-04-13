import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js';
import cors from 'cors';
import session from 'express-session';

// Cargar variables de entorno
dotenv.config();

// Crear servidor Express
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Configurar middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

// Configurar motor de plantillas
app.set('view engine', 'pug');
app.set('views', 'src/views');

// Configurar sesión
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // true para HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 semana
    }
}));

app.use((req, res, next) => {
    console.log("MIDDLEWARE >> req.session.member:", req.session.member);
    const member = req.session.member;
    console.log("MIDDLEWARE >> member:", !!member);

    res.locals.isLoggedIn = !!member;
    console.log("MIDDLEWARE >> res.locals.isLoggedIn:", res.locals.isLoggedIn);
    res.locals.name = member?.name || null;
    res.locals.isAdmin = member?.isAdmin || false;

    next();
});

// Configurar rutas
app.use('/', router);
app.get('/test', (req, res) => {
    res.send('Conexión a la base de datos establecida');
})

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
