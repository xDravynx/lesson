const Game = require("../models/game")
const messages = require('../UTILS/messages')

const getAllGames = async (req, res) => {
    try {
        const games = await Game.find({})
            .select('-__v')
            .populate('user', '-__v');

        res.status(200).json({ success: true, data: games });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getGameById = async (req, res) => {
    try {
        const {id} = req.params;
        const game = await Game.findById(id)
            .select('-__v')
            .populate('user', '-__v');;

        if (!game) {
            return res.status(404).json({ success: false, message: messages.GAME_NOT_FOUND})
        }
        res.status(200).json({ success: true, data: game });
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
};

const createGame = async (req, res) => {    
    try {
        const game = await Game.create(req.body)

        const gameObj = game.toObject();
        delete gameObj.__v;

    res.status(201).json({ success: true, data: gameObj });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};  

const updateGame = async (req, res) => {
  try {
      const {id} = req.params;
      const game = await Game.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })
            .select('-__v')
            .populate('user', '-__v');

      if (!game) {
        return res.status(404).json({ success: false, message: messages.GAME_NOT_FOUND })
      }
      res.status(200).json({success: true, data: game})

  } catch (error) {
    res.status(400)
    .json({ success: false, message: error.message})
}
}

const deleteGame = async (req, res) => {
try {
    const {id} = req.params;
    const game = await Game.findByIdAndDelete(id);

    if (!game) {
        return res.status(404).json({success: false, message: messages.GAME_NOT_FOUND})
    }
    res.status(200).json({success: true, message: "Game successfully deleted"})
} catch (error) {
    res.status(500).json({ success: false, message: error.message})
}
}


module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
};