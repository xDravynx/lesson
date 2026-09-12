const express = require('express');
const router = express.Router();
const gameRoutes = require('./gameRoutes');
const userRoute = require('./userRoute')


router.use('/games', gameRoutes);
 
router.use('/users', userRoute);


module.exports = router;