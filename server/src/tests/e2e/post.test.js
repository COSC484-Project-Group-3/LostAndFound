import request from 'supertest';
import { TestServer } from '../env/test.server.js';
import { MOCK_DATA } from '../../mock/post.data.js';

describe('Post', () => {
    let newPostId = '';
    it ('should be able to create a new post', async () => {
        const response = await request(TestServer.app).post('/api/posts/create').send(MOCK_DATA.NEW_VALID_POST);
        expect(response.body).toBeTruthy();
        newPostId = response.body._id;
        expect(response.status).toBe(201);
    });
    it ('should be able to get a post', async () => {
        const response = await request(TestServer.app).get(`/api/posts/post/${newPostId}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it ('should not be able to get a post with invalid id', async () => {
        const response = await request(TestServer.app).get(`/api/posts/post/${MOCK_DATA.INVALID_POST_ID}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Post not found');
    });
    it ('should be able to get posts within a distance', async () => {
        const response = await request(TestServer.app).get(`/api/posts/posts/in/${MOCK_DATA.POSTS_DISTANCE}`);
        expect(response.status).toBe(200 || 404);
    });
    it ('should be able to get posts by author id', async () => {
        const response = await request(TestServer.app).get(`/api/posts/posts/${MOCK_DATA.NEW_VALID_POST.author}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it ('should be able to update a post', async () => {
        const response = await request(TestServer.app).patch(`/api/posts/update/${newPostId}`).send(MOCK_DATA.UPDATED_VALID_POST);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });
    it ('should be able to delete a post', async () => {
        const response = await request(TestServer.app).delete(`/api/posts/delete/${newPostId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Post deleted');
    });
    it ('should not be able to delete a post with invalid id', async () => {
        const response = await request(TestServer.app).delete(`/api/posts/delete/${newPostId}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Post not found');
    });
});
