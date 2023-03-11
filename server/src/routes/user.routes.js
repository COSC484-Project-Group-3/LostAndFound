import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const UserRoutes = Router();

/**
 * @route POST /api/users/create
 * @description Create a user
 */
UserRoutes.post('/create', UserController.createUser);

/**
 * @route GET /api/users/users
 * @description Get all users
 */
UserRoutes.get('/users', UserController.getAllUsers);

/**
 * @route GET /api/users/user/:id
 * @description Get a user
 */
UserRoutes.get('/user/:id', UserController.getUser);

/**
 * @route PUT /api/users/update/:id
 * @description Update a user
 */
UserRoutes.put('/update/:id', UserController.updateUser);

/**
 * @route DELETE /api/users/delete/:id
 * @description Delete a user
 */
UserRoutes.delete('/delete/:id', UserController.deleteUser);


export default UserRoutes;
