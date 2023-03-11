
export class PostController {

    /**
     * Register a new user
     *
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} the new post
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the post is invalid
     * @returns {*} 404 if the author is not found
     */
    static createPost = (req, res) => {
        //TODO: 
    }

    /**
     * Get a post by id
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} the post
     * @returns {*} 404 if the post is not found
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the id is not valid
     */
    static getPost = (req, res) => {
        //TODO:
    }

    /**
     * Get all posts by author id
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} all posts by the author
     * @returns {*} 404 if the author is not found
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the id is not valid
     */
    static getPostsByAuthorId = (req, res) => {
        //TODO:
    }

    /**
     * Update a post by id
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} the updated post
     * @returns {*} 404 if the post is not found
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the id is not valid
     */
    static updatePost = (req, res) => {
        //TODO:
    }

    /**
     * Delete a post by id
     *
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} 404 if the post is not found
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the id is not valid
     */
    static deletePost = (req, res) => {
        //TODO:
    }
}
