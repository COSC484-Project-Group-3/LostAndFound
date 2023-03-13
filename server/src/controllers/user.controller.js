import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import { identicon } from 'minidenticons'
export class UserController {

    /**
    * Register a new user
    *
    * @param {*} req request object
    * @param {*} res response object
    * @returns {*} the new user
    * @returns {*} 500 if there is an error
    * @returns {*} 400 if the user is invalid
    */
    static createUser = (req, res) => {
        try {
            // hash password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);              
            const profilePicture = identicon(req.body.username);
            const user = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword,
                profilePicture: profilePicture
            });

            user.save((err, user) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                    return;
                }
                res.status(200).json(user);
            })
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    /**
     * Get all users
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} all users
     * @returns {*} 500 if there is an error
     */
    static getAllUsers = (req, res) => {
        User.find((err, users) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            }
            res.status(200).json(users);
        });
    }

    /**
     * Get a user by id
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} the user
     * @returns {*} 404 if the user is not found
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the id is not valid
     */
    static getUser = (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            } else if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json(user);
        });
    }

    /**
     * Update a user by id
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} the updated user
     * @returns {*} 404 if the user is not found
     * @returns {*} 500 if there is an error
     */
    static updateUser = (req, res) => {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        req.body.updatedAt = Date.now();
        User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            } else if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        });
    }

    /**
     * Delete a user by id
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} 404 if the user is not found
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the id is not valid
     * @returns {*} 200 if the user is deleted
     */
    static deleteUser = (req, res) => {
        // delete all posts of the user
        Post.deleteMany({ userId: req.params.id }, (err, posts) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            }
        });
        // delete the user
        User.findByIdAndDelete(req.params.id, (err, user) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            } else if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'User deleted successfully' });
        });
    }
}
