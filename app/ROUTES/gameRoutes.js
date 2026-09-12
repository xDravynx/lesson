const express = require('express');
const router = express.Router();
const {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} = require('../controller/gameController');

router.get('/', getAllGames);
    
router.get('/:id', getGameById);

router.post('/', createGame);

router.put('/:id', updateGame);

router.delete('/:id', deleteGame);



module.exports = router;

