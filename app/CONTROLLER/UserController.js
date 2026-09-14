const User = require("../models/user")
const messages = require("../UTILS/messages");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .select('-__v')
            .populate("favoriteGames", "-__v");

        res.status(200).json({ success: true, data: users });
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