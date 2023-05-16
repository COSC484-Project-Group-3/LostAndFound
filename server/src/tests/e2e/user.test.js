import request from 'supertest';
import { TestServer } from '../env/test.server.js';
import { MOCK_DATA } from '../../mock/user.data.js';

describe('User', () => {
    let newUserID = '';

    it('should be able to create a new user', async () => {
        const response = await request(TestServer.app).post('/api/users/create').send(MOCK_DATA.NEW_VALID_USER);
        expect(response.status).toBe(201);
        });

    it('should be able to login a user', async () => {
        const response = await request(TestServer.app).post('/api/users/login').send(MOCK_DATA.LOGIN_VALID_USER);
        expect(response.body).toBeTruthy();
        newUserID = response.body._id;
        expect(response.status).toBe(200);
    });

    it('should not be able to login a user with wrong password', async () => {
        const response = await request(TestServer.app).post('/api/users/login').send(MOCK_DATA.VALID_USER_DIFFERENT_PASSWORD);
        expect(response.body.message).toBe('Invalid password.');
        expect(response.status).toBe(400);
    });

    it('should be able to update a user password', async () => {
        const response = await request(TestServer.app).patch(`/api/users/update/${newUserID}`).send(MOCK_DATA.VALID_USER_DIFFERENT_PASSWORD);
        expect(response.status).toBe(200);
    });

    it('should be able to delete a user', async () => {
        const response = await request(TestServer.app).delete(`/api/users/delete/${newUserID}`);
        expect(response.body.message).toBe('User deleted successfully');
        expect(response.status).toBe(200);
    });

    it('should not be able to delete a user with invalid id', async () => {
        const response = await request(TestServer.app).delete(`/api/users/delete/${newUserID}`);
        expect(response.status).toBe(404);
    });

});
