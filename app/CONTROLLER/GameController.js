const Game = require("../models/game")

const getAllGames = async (req, res) => {
    try {
        const games = await Game.find({});
        res.status(200).json({ success: true, data: games });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getGameById = async (req, res) => {
    try {
        const {id} = req.params;
        const game = await Game.findById(id);

        if (!game) {
            return res.status(404).json({ success: false, message: 'Game not found!'})
        }
        res.status(200).json({ success: true, data: game });
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
};

const createGame = async (req, res) => {    
    try {
        const game = await Game.create(req.body)
    res.status(201).json({ success: true, data: game });
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
      });
      if (!game) {
        return res.status(404).json({ success: false, message: 'Game not updated!' })
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
        return res.status(404).json({success: false, message: 'Game not deleted!'})
    }
    res.status(200).json({success: true, message: "Game success deleted"})
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