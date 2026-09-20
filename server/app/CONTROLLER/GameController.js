const Game = require("../models/game")
const messages = require('../UTILS/messages')

const getAllGames = async (req, res) => {
    try {
        // 1. Filtering & Query Ops
        const queryObj = { ...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el])

        // Translate standard query strings into MongoDB Ops
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, match => `$${match}`);

        // Initialize the query with the parsed filters and preserve your populate method
        let query = Game.find(JSON.parse(queryStr)).populate('user', '-__v')

        // 2. Sorting
        if (req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }
        
        // 3. Field Limiting (select)
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        }else {
            // Keep your default exclusion of internal version key
            query = query.select('-__v')
        }

        // 4. Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 2;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // Execute the chained query
        const games = await query;

        res.status(200).json({ 
            success: true, 
            count: games.length,
            data: games 
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getGameById = async (req, res) => {
    try {
        const {id} = req.params;
        const game = await Game.findById(id)
            .select('-__v')
            .populate('user', '-__v');

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