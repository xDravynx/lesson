const express = require('express');
const router = express.Router();
const gameRoutes = require('./gameRoutes');
const userRoutes = require('./userRoute')


router.use('/games', gameRoutes);
 
router.use('/users', userRoutes);


module.exports = router;