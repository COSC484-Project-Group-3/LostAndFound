import { API_URL } from './env';

export const USER_ROUTES = {
    REGISTER_USER() {
        return `${API_URL}/api/users/create`;
    },
    GET_USERS() {
        return `${API_URL}/api/users/users`;
    },
    GET_USER(id) {
        return `${API_URL}/api/users/user/${id}`;
    },
    LOGIN_USER() {
        return `${API_URL}/api/users/login`;
    }
};

export const POST_ROUTES = {
    CREATE_POST() {
        return `${API_URL}/api/posts/create`;
    },
    GET_POSTS_BY_DISTANCE(distance) {
        return `${API_URL}/api/posts/posts/in/${distance}`;
    },
    GET_POSTS_BY_ID(id) {
        return `${API_URL}/api/posts/post/${id}`;
    },
    Get_POSTS_BY_USER(userId) {
        return `${API_URL}/api/posts/posts/${userId}`;
    },
    GET_ALL_POSTS() {
        return `${API_URL}/api/posts/posts`;
    }
};

export const LOCATION_ROUTES = {
    GET_LOCATIONS() {
        return `${API_URL}/api/locations/locations`;
    },
    GET_LOCATION(id) {
        return `${API_URL}/api/locations/location/${id}`;
    },
    CREATE_LOCATION() {
        return `${API_URL}/api/locations/create`;
    }
};
