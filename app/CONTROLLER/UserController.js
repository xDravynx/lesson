
const User = require("../models/user")


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).populate("favoriteGames");
        res.status(200).json({ success: true, data: users });
    }   
    catch (error) {
           res.status(400).json({ success: false, message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).populate('favoriteGames');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found!'})
        }
            res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({success: false, message: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
    res.status(201).json({ success: true, data: user });
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
      }).populate('favoriteGames');

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not updated!' })
      }
      res.status(200).json({success: true, data: user})

  } catch (error) {
    res.status(400)
    .json({ success: false, message: error.message})
}
}

const deleteUser = async (req, res) => {
try {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).json({success: false, message: 'User not deleted!'})
    }
    res.status(200).json({success: true, message: "User success deleted"})
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