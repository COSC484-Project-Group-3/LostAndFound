import { Router } from 'express';
import { PostController } from '../controllers/post.controller.js';

const PostRoutes = Router();

/**
 * @route POST /api/posts/create
 * @description Create a post
 */
PostRoutes.post('/create', PostController.createPost);

/**
 * @route GET /api/posts/post/:id
 * @description Get a post
 */
PostRoutes.get('/post/:id', PostController.getPost);

/**
 * @route GET /api/posts/posts/:distance/:lat/:long
 * @description Get all posts within a distance
 */
PostRoutes.get('/posts/:distance/:lat/:long', PostController.getPostsByDistance);

/**
 * @route GET /api/posts/posts/:authorId
 * @description Get all posts
 */
PostRoutes.get('/posts/:authorId', PostController.getPostsByAuthorId);

/**
 * @route PATCH /api/posts/update/:id
 * @description Update a post
 */
PostRoutes.patch('/update/:id', PostController.updatePost);

/**
 * @route DELETE /api/posts/delete/:id
 * @description Delete a post
 */
PostRoutes.delete('/delete/:id', PostController.deletePost);


export default PostRoutes;
