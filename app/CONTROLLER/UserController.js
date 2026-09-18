const User = require("../models/user")
const messages = require("../UTILS/messages");

const getAllUsers = async (req, res) => {
    try {
                // 1. Filtering & Query Ops
        const queryObj = { ...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el])
        
        // Translate standard query strings into MongoDB Ops
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, match => `$${match}`);

        // Initialize the query with parsed filters and preserve ur populate method
        let query = User.find(JSON.parse(queryStr)).populate('favoriteGames', '-__v')

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
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // Execute the chained query
        const users = await query

        res.status(200).json({ 
            success: true, 
            count: users.length,
            data: users
         });
    }   
    catch (error) {
           res.status(400).json({ success: false, message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id)
            .select('-__v')
            .populate("favoriteGames", "-__v");

        if (!user) {
            return res.status(404).json({ success: false, message: messages.USER_NOT_FOUND})
        }
            res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({success: false, message: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)

        const userObj = user.toObject();
        delete userObj.__v

    res.status(201).json({ success: true, data: userObj });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};  

const updateUser = async (req, res) => {
  try {
      const {id} = req.params;
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })
        .select('-__v')
        .populate("favoriteGames", "-__v");

      if (!user) {
        return res.status(404).json({ success: false, message: messages.USER_NOT_FOUND })
      }
      res.status(200).json({success: true, data: user})

  } catch (error) {
    res.status(400).json({ success: false, message: error.message})
}
}

const deleteUser = async (req, res) => {
try {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).json({success: false, message: messages.USER_NOT_FOUND})
    }
    res.status(200).json({success: true, message: "User successfully deleted"})
} catch (error) {
    res.status(500).json({ success: false, message: error.message})
}
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};