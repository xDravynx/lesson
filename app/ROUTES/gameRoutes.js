const express = require('express');
const router = express.Router();
const {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} = require('../controller/gameController');

// Handles paths hitting: /games
router.route('/')
    .get(getAllGames)
    .post(createGame);

// Handles paths hitting: /games/:id
router.route('/:id')
    .get(getGameById)
    .put(updateGame)
    .delete(deleteGame);

module.exports = router;

