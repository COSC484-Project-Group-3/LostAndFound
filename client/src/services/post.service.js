import axios from "axios";
import { POST_ROUTES } from "../constants/route";
import reverse from 'reverse-geocode';

export class PostService {
    /**
     * A function to create a post
     * 
     * @param {*} post a post object t0 be created
     * @returns the created post
     */
    static async createPost(post) {
        return await axios.post(POST_ROUTES.CREATE_POST(), post);
    }

    /**
     * A function to get posts by distance
     * 
     * @param {Number} distance a distance to search for posts
     * @returns the posts within the distance
     */
    static async getPostsByDistance(distance) {
        return await axios.get(POST_ROUTES.GET_POSTS_BY_DISTANCE(distance));
    }

    /**
     * A function to get all posts
     * 
     * @returns all posts
     */
    static async getAllPosts() {
        return await axios.get(POST_ROUTES.GET_ALL_POSTS());
    }

    /**
     * A function to get posts by user
     * 
     * @param {String} userId a user id to search for posts
     * @returns the posts by the user
     */
    static async getPostsByUser(userId) {
        return await axios.get(POST_ROUTES.GET_POSTS_BY_USER(userId));
    }

    /**
     * A function to get city and state of a post
     * 
     * @param {Object} an object containing the latitude and longitude of a post
     * @returns the city and state of the post
     */
    static getCityAndState(location) {
        const res = reverse.lookup(location.lat, location.lng, 'us')
        return res.city + ", " + res.state_abbr;
    }

    /**
     * A function to get a post time ago
     * 
     * @param {String} date data timestamp
     * @returns the time ago of the post
     */
    static getTimeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) {
            const years = Math.floor(interval);
            return years + (years > 1 ? " years" : " year") + " ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            const months = Math.floor(interval);
            return months + (months > 1 ? " months" : " month") + " ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            const days = Math.floor(interval);
            return days + (days > 1 ? " days" : " day") + " ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            const hours = Math.floor(interval);
            return hours + (hours > 1 ? " hours" : " hour") + " ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            const minutes = Math.floor(interval);
            return minutes + (minutes > 1 ? " minutes" : " minute") + " ago";
        }
        return "just now";
    }

    /**
     * A function to update a post
     * @param {*} post a post object to be updated to
     * @param {Number} postId a post id to be updated 
     */
    static async updatePost(post, postId) {
        return await axios.patch(POST_ROUTES.UPDATE_POST(postId), post)
    }

    /**
     * A function to delete a post
     * 
     * @param {*} post a post id to be delete
     */
        static async deletePost(postId) {
            return await axios.delete(POST_ROUTES.DELETE_POST(postId));
    }

}
