
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
            //TODO:
        }

        /**
         * Get all users
         * @params {*} req request object
         * @params {*} res response object
         * @returns {*} all users
         * @returns {*} 500 if there is an error
         */
        static getAllUsers = (req, res) => {
            //TODO:
        }

        /**
         * Get a user by id
         * @params {*} id the id of the user to get
         * @params {*} req request object
         * @params {*} res response object
         * @returns {*} the user
         * @returns {*} 404 if the user is not found
         * @returns {*} 500 if there is an error
         * @returns {*} 400 if the id is not valid
         */
        static getUser = (id, req, res) => {
            //TODO:
        }

        /**
         * Update a user by id
         * @params {*} id the id of the user to update
         * @params {*} req request object
         * @params {*} res response object
         * @returns {*} the updated user
         * @returns {*} 404 if the user is not found
         * @returns {*} 500 if there is an error
         * @returns {*} 400 if the id is not valid
         */
        static updateUser = (id, req, res) => {
            //TODO:
        }

        /**
         * Delete a user by id
         * @params {*} id the id of the user to delete
         * @params {*} req request object
         * @params {*} res response object
         * @returns {*} 404 if the user is not found
         * @returns {*} 500 if there is an error
         * @returns {*} 400 if the id is not valid
         * @returns {*} 200 if the user is deleted
         */
        static deleteUser = (id, req, res) => {
            //TODO:
        }
}
