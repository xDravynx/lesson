const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controller/userController');

// Handles paths hitting: /users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// Handles paths hitting:  /users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
    
module.exports = router;

