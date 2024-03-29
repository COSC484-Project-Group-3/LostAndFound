import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Location from '../models/location.model.js';
import { LocationService } from '../utils/location-service.js';
export class PostController {

    /**
     * Register a new user
     *
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} the new post
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the post is invalid
     */
    static createPost = async (req, res) => {
        try {
            const contactInfo = req.body.contactInfo;
            if (!contactInfo) {
                res.status(400).json({ message: 'Contact info is required' });
                return;
            }
            User.updateOne({ _id: req.body.author }, { $set: { contactInfo: contactInfo } }, (err, user) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                    return;
                } else if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
            });

            const post = new Post({
                author: req.body.author,
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                location: req.body.location,
                compensation: req.body.compensation,
            })
            post.save((err, post) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                    return;
                } 
                res.status(201).json(post);
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
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
        Post.findById(req.params.id)
            .populate('author')
            .populate('location')
            .exec((err, post) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                    return;
                } else if (!post) {
                    res.status(404).json({ message: 'Post not found' });
                    return;
                }
                res.status(200).json(post);
            });
    }

    /**
     * Get all posts
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} all posts
     * @returns {*} 500 if there is an error
     */
    static getPosts = async (req, res) => {
        // get ip address of the user
        const ip = LocationService.getIp(req);
        const clientCoordinates = await LocationService.getLatLongFromIP(ip).then((data) => {return data;});
        // get all posts
        Post.find({})
            .populate('author')
            .populate('location')
            .exec((err, posts) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                    return;
                }
                // return posts and client coordinates
                res.status(200).json({ posts: posts, clientCoordinates: clientCoordinates });
            });
    }

    /**
     * Get all posts within a distance
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} all posts within the distance
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the distance is not valid
     * @returns {*} 404 if the post is not found
     */
    static getPostsByDistance = async (req, res) => {
        // get ip address of the user
        const ip = LocationService.getIp(req);
        const clientCoordinates = await LocationService.getLatLongFromIP(ip).then((data) => {return data;});
        // get all locations within the distance
        Location.find({}, (err, locations) => {
            const locationIdToDistance = new Map();
            locations.forEach(location => {
                let distance = LocationService.getDistance(clientCoordinates.lat, clientCoordinates.lon, location.latitude, location.longitude);
                if (distance <= req.params.distance) {
                    locationIdToDistance.set(location._id.toString(), distance);
                }
            });
            // get all posts where the location id is in the array
            Post.find({ location: { $in: [ ...locationIdToDistance.keys() ] } })
                .populate('author')
                .populate('location')
                .exec((err, posts) => {
                    if (err) {
                        res.status(500).json({ message: err.message });
                        return;
                    } else if (!posts) {
                        res.status(404).json({ message: 'Posts not found' });
                        return;
                    }
                    // add the distance to each post
                    posts = posts.map(post => ({
                        ...post.toObject(),
                        distance: locationIdToDistance.get(post.location._id.toString())
                    }));
                    res.status(200).json(posts);
                });
            });
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
        Post.find({ author: req.params.authorId })
            .populate('author')
            .populate('location')
            .exec((err, posts) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                    return;
                } else if (!posts) {
                    res.status(404).json({ message: 'Posts not found' });
                    return;
                }
                res.status(200).json(posts);
            });
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
        req.body.updatedAt = Date.now();
        Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            } else if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }
            res.status(200).json(post);
        });
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
        Post.findByIdAndDelete(req.params.id, (err, post) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            } else if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }
            res.status(200).json({ message: 'Post deleted' });
        });
    }
}
