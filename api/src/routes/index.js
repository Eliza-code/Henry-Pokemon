const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemon = require('./pokemon');
const tipos = require('./tipos');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemon', pokemon);
router.use('/tipos', tipos);


module.exports = router;
